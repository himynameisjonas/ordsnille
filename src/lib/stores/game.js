import { writable } from "svelte/store";
import words from "$lib/words";
import { notifications } from "$lib/stores/notifications.js";

const defaultValue = {
  board: ["", "", "", "", ""],
  hints: [],
  boardIndex: 0,
  solution: words[1986],
  status: "new",
};

function createGame() {
  let startValue;
  if (typeof localStorage !== "undefined") {
    startValue = JSON.parse(localStorage.getItem("game")) || defaultValue;
  } else {
    startValue = defaultValue;
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
        if (attempt.length == 5 && words.includes(attempt)) {
          game.boardIndex = game.boardIndex + 1;
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
            notifications.success("Grattis, du klarade det!");
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
        game.status = "started";
        return game;
      }),
  };
}

export default createGame();
