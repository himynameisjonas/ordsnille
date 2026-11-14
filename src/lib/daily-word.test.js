import { describe, expect, test } from "vitest";
import { addDays } from "date-fns";
import { dailyAnswers } from "./daily-answers.js";
import { allWords, answers, frequentWords } from "./words.js";
import { curatedStartDate, gameNumberForDate, wordForDate } from "./daily-word.js";

describe("daily answer schedule", () => {
  test("preserves every historical answer before the curated schedule", () => {
    const start = new Date(2022, 0, 7);
    const expandedStart = new Date(2025, 5, 9);
    for (let date = start; date < curatedStartDate; date = addDays(date, 1)) {
      const words = date < expandedStart ? frequentWords : answers;
      expect(wordForDate(date)).toBe(words[gameNumberForDate(date) % words.length]);
    }
    expect(wordForDate(new Date(2026, 10, 14))).toBe("cesur");
  });

  test("switches at local midnight without resetting the game number", () => {
    const before = new Date(2026, 10, 15, 23, 59, 59);
    expect(wordForDate(before)).toBe(answers[gameNumberForDate(before) % answers.length]);
    expect(wordForDate(curatedStartDate)).toBe(dailyAnswers[0]);
    expect(gameNumberForDate(curatedStartDate)).toBe(gameNumberForDate(before) + 1);
    expect(wordForDate(new Date(2026, 10, 16, 23, 59))).toBe(dailyAnswers[0]);
  });

  test("uses the whole pool before repeating, including across daylight saving", () => {
    for (let day = 0; day < dailyAnswers.length * 2; day++) {
      expect(wordForDate(addDays(curatedStartDate, day))).toBe(
        dailyAnswers[day % dailyAnswers.length]
      );
    }
  });

  test("answers are unique valid guesses with five Swedish letters", () => {
    expect(new Set(dailyAnswers).size).toBe(dailyAnswers.length);
    for (const word of dailyAnswers) {
      expect(word).toMatch(/^[a-zåäö]{5}$/);
      expect(allWords).toContain(word);
    }
  });

  test("specialist words remain valid guesses but cannot be daily answers", () => {
    for (const word of ["manta", "latta", "cesur", "ambra", "laura", "crazy"]) {
      expect(allWords).toContain(word);
      expect(dailyAnswers).not.toContain(word);
    }
  });
});
