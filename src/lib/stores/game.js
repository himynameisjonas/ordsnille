import { get, writable, derived } from "svelte/store";
import { allWords } from "$lib/words";
import { notifications } from "$lib/stores/notifications.js";
import { todaysWord, gameNumber } from "$lib/stores/word.js";
import { stats } from "$lib/stores/stats.js";

function defaultValues() {
  return {
    board: Array(6).fill(""),
    hints: [],
    boardIndex: 0,
    solution: get(todaysWord),
    status: "new",
  };
}

const game = (function () {
  let startValue;
  if (typeof localStorage !== "undefined") {
    startValue = JSON.parse(localStorage.getItem("game")) || defaultValues();
  } else {
    startValue = defaultValues();
  }

  const game = writable(startValue);
  const { subscribe, update } = game;

  if (typeof localStorage !== "undefined") {
    game.subscribe((game) => (localStorage.game = JSON.stringify(game)));
  }

  return {
    subscribe,
    update,
    trySolution: () => {
      update((game) => {
        let boardIndex = game.boardIndex;
        let solutionArray = Array.from(game.solution);
        let attempt = game.board[boardIndex];
        let attemptArray = Array.from(attempt);
        if (attempt.length == 5 && allWords.includes(attempt)) {
          game.hints[boardIndex] = Array(5).fill(0);

          solutionArray.forEach((letter, letterIndex) => {
            if (attemptArray[letterIndex] == letter) {
              game.hints[boardIndex][letterIndex] = 2;
              solutionArray[letterIndex] = "-";
              attemptArray[letterIndex] = "-";
            } else {
              let i = attemptArray.indexOf(letter);
              if (i > -1) {
                game.hints[boardIndex][i] = 1;
                solutionArray[letterIndex] = "-";
              }
            }
          });

          if (attempt == game.solution) {
            stats.logSuccess(game);
            notifications.success("Grattis, du klarade det!");
            setTimeout(() => {
              update((game) => {
                game.status = "completed";
                return game;
              });
            }, 3000);
          } else if (boardIndex == 5) {
            stats.logFailure(game);
            notifications.warning("Otur, bättre lycka i morgon!");
            setTimeout(() => {
              update((game) => {
                game.status = "completed";
                return game;
              });
            }, 3000);
          } else {
            window.plausible("guessed", {
              props: {
                attempt,
                gameNumber: get(gameNumber),
                boardIndex: game.boardIndex,
                solution: game.solution,
              },
            });

            game.boardIndex = boardIndex + 1;
          }
        }
        return game;
      });
    },
    addLetter: (letter) =>
      update((game) => {
        let i = game.boardIndex;
        if (game.board[i].length < 5) {
          game.board[i] += letter;
        }
        return game;
      }),
    deleteLetter: () =>
      update((game) => {
        let i = game.boardIndex;
        game.board[i] = game.board[i].slice(0, -1);
        return game;
      }),
    start: () =>
      update((game) => {
        if (game.status == "new") {
          game.status = "started";
        }
        return game;
      }),
    restart: () =>
      update((game) => {
        game = defaultValues();
        game.status = "started";
        return game;
      }),
  };
})();

export default game;

export const hasWon = derived(game, ($game) => {
  return $game.status == "completed" && $game.board[$game.boardIndex] == $game.solution;
});

export const emojiResult = derived(game, ($game) => {
  return $game.hints
    .map((row) => {
      return row
        .map((hint) => {
          if (hint == 0) return "⬜️";
          if (hint == 1) return "🟧";
          if (hint == 2) return "🟩";
        })
        .join("");
    })
    .join("\n");
});
