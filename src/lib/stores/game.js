import { writable } from "svelte/store";

function currentRowIndex(game) {
  // return game.findIndex((row) => {
  //   return row.length < 5;
  // });
  return 0;
}

function createGame() {
  const { subscribe, update } = writable(["", "", "", "", ""]);

  return {
    subscribe,
    addLetter: (letter) =>
      update((game) => {
        let index = currentRowIndex(game);
        if (game[index].length < 5) {
          game[index] += letter;
        }

        return game;
      }),
    deleteLetter: () =>
      update((game) => {
        let index = currentRowIndex(game);
        game[index] = game[index].slice(0, -1);

        return game;
      }),
  };
}

export default createGame();
