import words from "$lib/words.js";
import { readable } from "svelte/store";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays/index.js";
const startDate = new Date(2022, 0, 7, 0, 0);

function daysFromStart() {
  return differenceInCalendarDays(new Date(), startDate);
}

function wordIndex() {
  let index = daysFromStart();
  return index - words.length * Math.floor(index / words.length);
}

function _todaysWord() {
  return words[wordIndex()];
}

export const todaysWord = readable(_todaysWord(), function start(set) {
  set(_todaysWord());
  const interval = setInterval(() => {
    set(_todaysWord());
  }, 10000);

  return function stop() {
    clearInterval(interval);
  };
});
