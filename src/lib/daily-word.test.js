import { describe, expect, test } from "vitest";
import { addDays } from "date-fns";
import { dailyAnswers } from "./daily-answers.js";
import { balancedDailyAnswers } from "./balanced-daily-answers.js";
import { uncommonAnswers, rareAnswers } from "./answer-tiers.js";
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

  test("keeps all three editorial pools and the familiar answer order", () => {
    const familiar = new Set(dailyAnswers);
    expect(balancedDailyAnswers.filter((word) => familiar.has(word))).toEqual([
      ...dailyAnswers.slice(4),
      ...dailyAnswers.slice(0, 4),
    ]);
    expect(uncommonAnswers).toHaveLength(440);
    expect(rareAnswers).toHaveLength(256);
    expect([...balancedDailyAnswers].sort()).toEqual(
      [...dailyAnswers, ...uncommonAnswers, ...rareAnswers].sort()
    );
  });

  test("keeps about 45 percent harder answers and a mix in every seven-day period", () => {
    const harder = new Set([...uncommonAnswers, ...rareAnswers]);
    const share = harder.size / balancedDailyAnswers.length;
    expect(share).toBeGreaterThanOrEqual(0.44);
    expect(share).toBeLessThanOrEqual(0.46);
    for (let day = 0; day < balancedDailyAnswers.length; day++) {
      const count = Array.from({ length: 7 }, (_, offset) =>
        wordForDate(addDays(balancedStartDate, day + offset))
      ).filter((word) => harder.has(word)).length;
      expect(count).toBeGreaterThanOrEqual(2);
      expect(count).toBeLessThanOrEqual(5);
    }
  });

  test("every rolling seven-day window includes a very rare word, including across repeats", () => {
    const rare = new Set(rareAnswers);
    for (let day = 0; day < balancedDailyAnswers.length; day++) {
      const week = Array.from({ length: 7 }, (_, offset) =>
        wordForDate(addDays(balancedStartDate, day + offset))
      );
      const rareCount = week.filter((word) => rare.has(word)).length;
      expect(rareCount).toBeGreaterThanOrEqual(1);
      expect(rareCount).toBeLessThanOrEqual(2);
    }
    for (let day = 0; day < balancedDailyAnswers.length; day++) {
      const today = balancedDailyAnswers[day];
      const tomorrow = balancedDailyAnswers[(day + 1) % balancedDailyAnswers.length];
      expect(rare.has(today) && rare.has(tomorrow)).toBe(false);
    }
  });

  test("harder tiers rotate weekdays without recurring on the same day in adjacent weeks", () => {
    for (const tier of [uncommonAnswers, rareAnswers]) {
      const words = new Set(tier);
      const weekdays = Array(7).fill(0);
      const weeks = new Map();
      const startWeekday = (balancedStartDate.getDay() + 6) % 7;
      for (let day = 0; day < balancedDailyAnswers.length * 2; day++) {
        const date = addDays(balancedStartDate, day);
        if (!words.has(wordForDate(date))) continue;
        const weekday = date.getDay();
        const week = Math.floor((day + startWeekday) / 7);
        expect(weeks.get(week - 1)?.has(weekday) ?? false).toBe(false);
        if (!weeks.has(week)) weeks.set(week, new Set());
        weeks.get(week).add(weekday);
        if (day < balancedDailyAnswers.length) weekdays[weekday]++;
      }
      expect(Math.min(...weekdays)).toBeGreaterThan(0);
      expect(Math.max(...weekdays) - Math.min(...weekdays)).toBeLessThanOrEqual(2);
    }
  });

  test("excluded names and English words remain valid guesses", () => {
    for (const word of ["laura", "crazy"]) {
      expect(allWords).toContain(word);
      expect(dailyAnswers).not.toContain(word);
      expect(balancedDailyAnswers).not.toContain(word);
    }
  });
});
