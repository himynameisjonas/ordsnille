import { answers } from "$lib/words.js";
import { derived, writable } from "svelte/store";

function initialGamesPlayed() {
  if (typeof localStorage === "undefined") return 0;
  return Number(localStorage.getItem("gamesPlayed")) || 0;
}

export const gamesPlayed = writable(initialGamesPlayed());

if (typeof localStorage !== "undefined") {
  gamesPlayed.subscribe((value) => {
    localStorage.setItem("gamesPlayed", String(value));
  });
}

export const totalWords = answers.length;
export const currentWord = derived(gamesPlayed, ($gamesPlayed) => answers[$gamesPlayed]);
export const allWordsPlayed = derived(gamesPlayed, ($gamesPlayed) => $gamesPlayed >= totalWords);

export function advanceToNextWord() {
  gamesPlayed.update((count) => Math.min(count + 1, totalWords));
}

export function resetProgress() {
  gamesPlayed.set(0);
}
