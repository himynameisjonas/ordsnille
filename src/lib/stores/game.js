import { writable } from "svelte/store";
import words from "$lib/words";
import { notifications } from "$lib/stores/notifications.js";

const defaultValue = {
  board: ["", "", "", "", ""],
  hints: [],
  boardIndex: 0,
  solution: words[1337],
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
    trySolution: () => {
      update((game) => {
        let i = game.boardIndex;
        let solution = Array.from(game.solution);
        let attempt = game.board[i];
        if (attempt.length == 5 && words.includes(attempt)) {
          game.boardIndex = game.boardIndex + 1;
          game.hints[i] = [];
          Array.from(attempt).forEach((letter, letterIndex) => {
            if (solution[letterIndex] == letter) {
              game.hints[i][letterIndex] = 2;
            } else if (solution.includes(letter)) {
              game.hints[i][letterIndex] = 1;
            } else {
              game.hints[i][letterIndex] = 0;
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
  };
}

export default createGame();
