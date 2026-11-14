import { render, screen, cleanup } from "@testing-library/svelte";
import { tick } from "svelte";
import { afterEach, expect, test, vi } from "vitest";
import { gameNumber } from "$lib/stores/word.js";
import { gameNumberForDate } from "$lib/daily-word.js";
import WordListNotice from "./WordListNotice.svelte";

vi.mock("$lib/stores/word.js", async () => {
  const { writable } = await import("svelte/store");
  return { gameNumber: writable(0) };
});

afterEach(cleanup);

test("removes the notice when an open page reaches 1 December", async () => {
  gameNumber.set(gameNumberForDate(new Date(2026, 10, 30)));
  render(WordListNotice);
  expect(screen.getByRole("complementary", { name: "Vanligare ord i Ordsnille" })).toBeTruthy();

  gameNumber.set(gameNumberForDate(new Date(2026, 11, 1)));
  await tick();
  expect(screen.queryByRole("complementary")).toBeNull();
});

test("does not show the notice when visiting after its expiry", () => {
  gameNumber.set(gameNumberForDate(new Date(2027, 0, 1)));
  render(WordListNotice);
  expect(screen.queryByRole("complementary")).toBeNull();
});
