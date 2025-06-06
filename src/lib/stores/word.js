import { frequentWords, answers } from "$lib/words.js";
import { readable } from "svelte/store";
import { differenceInCalendarDays } from "date-fns";
const startDate = new Date(2022, 0, 7, 0, 0);
const secondStartDate = new Date(2025, 5, 9, 0, 0);

function useMoreWords() {
  return new Date() >= secondStartDate;
}

function daysFromStart() {
  return differenceInCalendarDays(new Date(), startDate);
}

function wordIndex() {
  let index = daysFromStart();
  if (useMoreWords()) {
    return index - answers.length * Math.floor(index / answers.length);
  } else {
    return index - frequentWords.length * Math.floor(index / frequentWords.length);
  }
}

function _todaysWord() {
  if (useMoreWords()) {
    return answers[wordIndex()];
  } else {
    return frequentWords[wordIndex()];
  }
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
