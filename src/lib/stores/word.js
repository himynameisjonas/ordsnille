import { readable } from "svelte/store";
import { gameNumberForDate, wordForDate } from "$lib/daily-word.js";

export const todaysWord = readable(wordForDate(new Date()), function start(set) {
  const interval = setInterval(() => {
    set(wordForDate(new Date()));
  }, 10000);

  return function stop() {
    clearInterval(interval);
  };
});

export const gameNumber = readable(gameNumberForDate(new Date()), function start(set) {
  const interval = setInterval(() => {
    set(gameNumberForDate(new Date()));
  }, 10000);

  return function stop() {
    clearInterval(interval);
  };
});
