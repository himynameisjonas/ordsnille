import { differenceInCalendarDays } from "date-fns";
import { frequentWords, answers } from "./words.js";
import { dailyAnswers } from "./daily-answers.js";

const startDate = new Date(2022, 0, 7);
const expandedStartDate = new Date(2025, 5, 9);
export const curatedStartDate = new Date(2026, 10, 16);

export function gameNumberForDate(date) {
  return differenceInCalendarDays(date, startDate);
}

export function wordForDate(date) {
  if (date >= curatedStartDate) {
    const day = differenceInCalendarDays(date, curatedStartDate);
    return dailyAnswers[day % dailyAnswers.length];
  }

  const words = date >= expandedStartDate ? answers : frequentWords;
  return words[gameNumberForDate(date) % words.length];
}
