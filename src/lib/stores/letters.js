import game from "$lib/stores/game.js";
import { derived } from "svelte/store";

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

export const present = derived(game, ($game) => {
  return findLetters($game, 1);
});

export const correct = derived(game, ($game) => {
  return findLetters($game, 2);
});

export const absent = derived(game, ($game) => {
  return findLetters($game, 0);
});
