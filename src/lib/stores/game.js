import { writable } from "svelte/store";
import words from "$lib/words";

function createGame() {
  const game = writable({
    board: ["", "", "", "", ""],
    hints: [],
    boardIndex: 0,
    solution: words[0],
  });
  const { subscribe, update } = game;

  return {
    subscribe,
    trySolution: () => {
      update((game) => {
        let i = game.boardIndex;
        let solution = Array.from(game.solution);
        if (game.board[i].length == 5) {
          game.boardIndex = game.boardIndex + 1;
          game.hints[i] = [];
          Array.from(game.board[i]).forEach((letter, letterIndex) => {
            if (solution[letterIndex] == letter) {
              game.hints[i][letterIndex] = 2;
            } else if (solution.indexOf(letter) > -1) {
              game.hints[i][letterIndex] = 1;
            } else {
              game.hints[i][letterIndex] = 0;
            }
          });
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
