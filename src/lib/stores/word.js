import { frequentWords } from "$lib/words.js";
import { readable } from "svelte/store";
import { differenceInCalendarDays } from "date-fns";
const startDate = new Date(2022, 0, 7, 0, 0);

function daysFromStart() {
  return differenceInCalendarDays(new Date(), startDate);
}

function wordIndex() {
  let index = daysFromStart();
  return index - frequentWords.length * Math.floor(index / frequentWords.length);
}

function _todaysWord() {
  return frequentWords[wordIndex()];
}

export const todaysWord = readable(_todaysWord(), function start(set) {
  const interval = setInterval(() => {
    set(_todaysWord());
  }, 10000);

  return function stop() {
    clearInterval(interval);
  };
});

export const gameNumber = readable(daysFromStart(), function start(set) {
  const interval = setInterval(() => {
    set(daysFromStart());
  }, 10000);

  return function stop() {
    clearInterval(interval);
  };
});
