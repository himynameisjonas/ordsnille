import game from "$lib/stores/game.js";
import { derived, readable } from "svelte/store";

const letters = new Set([
  "q",
  "w",
  "e",
  "r",
  "t",
  "y",
  "u",
  "i",
  "o",
  "p",
  "å",
  "a",
  "s",
  "d",
  "f",
  "g",
  "h",
  "j",
  "k",
  "l",
  "ö",
  "ä",
  "z",
  "x",
  "c",
  "v",
  "b",
  "n",
  "m",
]);

function findLetters(game, hintStatus) {
  let letters = new Set();
  game.hints.forEach((hints, boardIndex) => {
    hints.forEach((hint, letterIndex) => {
      let boardLetters = Array.from(game.board[boardIndex]);
      if (hint == hintStatus) {
        letters.add(boardLetters[letterIndex]);
      }
    });
  });
  return letters;
}
export const all = readable(letters);

export const correct = derived(game, ($game) => {
  return findLetters($game, 2);
});

export const present = derived(game, ($game) => {
  return findLetters($game, 1);
});

export const absent = derived(game, ($game) => {
  return findLetters($game, 0);
});
