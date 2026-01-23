import { get, writable, derived } from "svelte/store";
import { allWords } from "$lib/words";
import { notifications } from "$lib/stores/notifications.js";
import { currentWord, advanceToNextWord } from "$lib/stores/word.js";
import { goto } from "$app/navigation";
import { getUnixTime } from "date-fns";
import confetti from "canvas-confetti";

function defaultValues() {
  return {
    board: Array(6).fill(""),
    hints: [],
    boardIndex: 0,
    solution: get(currentWord),
    status: "new",
    invalidWord: false,
    startedAt: null,
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
        update((game) => {
          game.startedAt = game.startedAt || getUnixTime(new Date());
          return game;
        });

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
            }
          });
          attemptArray.forEach((letter, letterIndex) => {
            if (letter === "-") return;
            let i = solutionArray.indexOf(letter);
            if (i > -1) {
              game.hints[boardIndex][letterIndex] = 1;
              solutionArray[i] = "-";
            }
          });

          if (attempt == game.solution) {
            setTimeout(() => {
              notifications.success("Grattis, du klarade det!");
              confetti({
                spread: 55,
                gravity: 0.5,
                ticks: 225,
                scalar: 1.2,
                particleCount: 200,
                colors: ["#00C950", "#06DF73", "#B9F8CF", "#D0FAE5"],
                origin: { y: 0.8 },
              });
            }, 1000);

            setTimeout(() => {
              update((game) => {
                game.status = "completed";
                advanceToNextWord();
                goto("/resultat");
                return game;
              });
            }, 3000);
          } else if (boardIndex == 5) {
            notifications.warning("Tyvärr, det blev fel!");
            setTimeout(() => {
              update((game) => {
                game.status = "completed";
                advanceToNextWord();
                goto("/resultat");
                return game;
              });
            }, 3000);
          } else {
            game.boardIndex = boardIndex + 1;
          }
        }
        game.invalidWord = false;
        return game;
      });
    },
    addLetter: (letter) =>
      update((game) => {
        let i = game.boardIndex;
        if (game.board[i].length < 5) {
          game.board[i] += letter;
        }
        game.invalidWord = false;
        return game;
      }),
    deleteLetter: () =>
      update((game) => {
        let i = game.boardIndex;
        game.board[i] = game.board[i].slice(0, -1);
        game.invalidWord = false;
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
    invalidWord: () =>
      update((game) => {
        game.invalidWord = true;
        return game;
      }),
  };
})();

export default game;

export const hasWon = derived(game, ($game) => {
  return $game.status == "completed" && $game.board[$game.boardIndex] == $game.solution;
});

export const hasPlayed = derived(game, ($game) => {
  return $game.hints.length > 0;
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

export const currentGuess = derived(game, ($game) => {
  return $game.board[$game.boardIndex];
});

let timeForHintTimeout;
export const timeForHint = derived(currentGuess, ($currentGuess, set) => {
  clearTimeout(timeForHintTimeout);
  if ($currentGuess.length === 5) {
    timeForHintTimeout = setTimeout(() => {
      set(true);
    }, 3000);
  } else {
    clearTimeout(timeForHintTimeout);
    set(false);
  }
});

export const firstLoad = writable(true);

export const currentIndexes = derived(game, ($game) => {
  return { board: $game.boardIndex, letter: $game.board[$game.boardIndex].length };
});
