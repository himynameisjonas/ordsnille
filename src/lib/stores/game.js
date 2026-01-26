import { get, writable, derived } from "svelte/store";
import { allWords } from "$lib/words";
import { notifications } from "$lib/stores/notifications.js";
import { currentWordText, advanceToNextWord } from "$lib/stores/word.js";
import { goto } from "$app/navigation";
import { getUnixTime } from "date-fns";
import confetti from "canvas-confetti";

const emptyRow = ["", "", "", "", ""];
const normalizeRow = (row) => {
  const arr = Array.from(row || "");
  return [...arr, ...emptyRow].slice(0, 5);
};
const rowToString = (row) => row.map((letter) => (letter === "" ? " " : letter)).join("");
const rowToLetters = (row) => row.map((letter) => (letter === " " ? "" : letter));
const getFirstEmptyIndex = (row) => {
  const index = row.findIndex((letter) => letter === "" || letter === " ");
  return index === -1 ? 5 : index;
};
const isRowComplete = (row) => rowToLetters(row).every((letter) => letter);
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export const currentIndexes = writable({ board: 0, letter: 0 });
let cursorMovedManually = false;

function defaultValues() {
  return {
    board: Array(6).fill(""),
    hints: [],
    boardIndex: 0,
    solution: get(currentWordText),
    status: "new",
    invalidWord: false,
    showCompletionModal: false,
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
  currentIndexes.set({
    board: startValue.boardIndex,
    letter: Math.min(getFirstEmptyIndex(normalizeRow(startValue.board[startValue.boardIndex])), 4),
  });
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
        let attemptArray = rowToLetters(normalizeRow(attempt));
        let attemptString = attemptArray.join("");
        if (isRowComplete(attemptArray) && allWords.includes(attemptString)) {
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

          if (attemptString == game.solution) {
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
                game.showCompletionModal = true;
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
            currentIndexes.set({
              board: game.boardIndex,
              letter: Math.min(getFirstEmptyIndex(normalizeRow(game.board[game.boardIndex])), 4),
            });
          }
        }
        game.invalidWord = false;
        return game;
      });
    },
    addLetter: (letter) =>
      update((game) => {
        let i = game.boardIndex;
        const { letter: cursorIndex } = get(currentIndexes);
        const nextIndex = clamp(cursorIndex + 1, 0, 4);
        if (letter === " ") {
          if (cursorIndex < 5) {
            const row = normalizeRow(game.board[i]);
            row[cursorIndex] = "";
            game.board[i] = rowToString(row);
          }
          currentIndexes.set({ board: i, letter: nextIndex });
          cursorMovedManually = false;
          game.invalidWord = false;
          return game;
        }
        if (cursorIndex < 5) {
          const row = normalizeRow(game.board[i]);
          row[cursorIndex] = letter;
          game.board[i] = rowToString(row);
          currentIndexes.set({ board: i, letter: nextIndex });
          cursorMovedManually = false;
        }
        game.invalidWord = false;
        return game;
      }),
    deleteLetter: () =>
      update((game) => {
        let i = game.boardIndex;
        const { letter: cursorIndex } = get(currentIndexes);
        const row = normalizeRow(game.board[i]);
        if (cursorMovedManually) {
          const targetIndex = clamp(cursorIndex, 0, 4);
          row[targetIndex] = "";
          game.board[i] = rowToString(row);
          currentIndexes.set({ board: i, letter: targetIndex });
          cursorMovedManually = false;
        } else {
          let targetIndex;
          if (cursorIndex === 4 && (row[4] === "" || row[4] === " ")) {
            targetIndex = 3;
          } else {
            targetIndex = cursorIndex === 4 ? 4 : clamp(cursorIndex - 1, 0, 4);
          }
          row[targetIndex] = "";
          game.board[i] = rowToString(row);
          currentIndexes.set({ board: i, letter: targetIndex });
        }
        game.invalidWord = false;
        return game;
      }),
    setCursor: (letterIndex) =>
      update((game) => {
        cursorMovedManually = true;
        currentIndexes.set({
          board: game.boardIndex,
          letter: clamp(letterIndex, 0, 4),
        });
        return game;
      }),
    moveCursor: (delta) =>
      update((game) => {
        const { letter: cursorIndex } = get(currentIndexes);
        cursorMovedManually = true;
        currentIndexes.set({
          board: game.boardIndex,
          letter: clamp(cursorIndex + delta, 0, 4),
        });
        return game;
      }),
    start: () =>
      update((game) => {
        if (game.status == "new") {
          game.status = "started";
          currentIndexes.set({
            board: game.boardIndex,
            letter: Math.min(getFirstEmptyIndex(normalizeRow(game.board[game.boardIndex])), 4),
          });
        }
        return game;
      }),
    restart: () =>
      update((game) => {
        game = defaultValues();
        game.status = "started";
        currentIndexes.set({ board: 0, letter: 0 });
        return game;
      }),
    closeCompletionModal: () =>
      update((game) => {
        game.showCompletionModal = false;
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
  const row = normalizeRow($currentGuess);
  if (isRowComplete(row)) {
    timeForHintTimeout = setTimeout(() => {
      set(true);
    }, 3000);
  } else {
    clearTimeout(timeForHintTimeout);
    set(false);
  }
});

export const firstLoad = writable(true);
