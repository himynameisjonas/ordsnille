import { describe, expect, test } from "vitest";
import { addDays } from "date-fns";
import { dailyAnswers } from "./daily-answers.js";
import { balancedDailyAnswers } from "./balanced-daily-answers.js";
import { allWords, answers, frequentWords } from "./words.js";
import {
  balancedStartDate,
  curatedStartDate,
  gameNumberForDate,
  wordForDate,
} from "./daily-word.js";

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

  test("preserves the first curated schedule until the new local-midnight cutover", () => {
    for (let date = curatedStartDate; date < balancedStartDate; date = addDays(date, 1)) {
      const day = gameNumberForDate(date) - gameNumberForDate(curatedStartDate);
      expect(wordForDate(date)).toBe(dailyAnswers[day]);
    }
    expect(wordForDate(new Date(2026, 10, 19, 23, 59, 59))).toBe("klass");
    expect(wordForDate(balancedStartDate)).toBe("synes");
    expect(wordForDate(new Date(2026, 10, 20, 23, 59, 59))).toBe("synes");
    expect(gameNumberForDate(balancedStartDate)).toBe(
      gameNumberForDate(new Date(2026, 10, 19)) + 1
    );
  });

  test("uses the whole balanced pool before repeating, including across daylight saving", () => {
    for (let day = 0; day < balancedDailyAnswers.length * 2; day++) {
      expect(wordForDate(addDays(balancedStartDate, day))).toBe(
        balancedDailyAnswers[day % balancedDailyAnswers.length]
      );
    }
  });

  test("answers are unique valid guesses with five Swedish letters", () => {
    for (const pool of [dailyAnswers, balancedDailyAnswers]) {
      expect(new Set(pool).size).toBe(pool.length);
      for (const word of pool) {
        expect(word).toMatch(/^[a-zåäö]{5}$/);
        expect(allWords).toContain(word);
      }
    }
  });

  test("keeps the familiar pool and spaces the 100 additions eight or nine familiar words apart", () => {
    const familiar = new Set(dailyAnswers);
    expect(balancedDailyAnswers.filter((word) => familiar.has(word))).toEqual([
      ...dailyAnswers.slice(4),
      ...dailyAnswers.slice(0, 4),
    ]);
    const additions = balancedDailyAnswers.filter((word) => !familiar.has(word));
    expect(additions).toHaveLength(100);
    expect(additions).toEqual(
      expect.arrayContaining(["fager", "sämja", "kutym", "emoji", "chatt"])
    );
    let familiarSinceAddition = 0;
    for (const word of balancedDailyAnswers) {
      if (familiar.has(word)) {
        familiarSinceAddition++;
      } else {
        expect(familiarSinceAddition).toBeGreaterThanOrEqual(8);
        expect(familiarSinceAddition).toBeLessThanOrEqual(9);
        familiarSinceAddition = 0;
      }
    }
    expect(familiarSinceAddition).toBe(0);
  });

  test("excluded specialist words and names remain valid guesses", () => {
    for (const word of ["manta", "latta", "cesur", "ambra", "laura", "crazy"]) {
      expect(allWords).toContain(word);
      expect(dailyAnswers).not.toContain(word);
      expect(balancedDailyAnswers).not.toContain(word);
    }
  });
});
