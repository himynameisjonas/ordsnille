import { get } from "svelte/store";

import Game from "./Game.js";

test("addLetter should add the leters to board", () => {
  Game.addLetter("b");
  Game.addLetter("a");
  Game.addLetter("n");
  Game.addLetter("a");
  Game.addLetter("n");
  expect(get(Game).board[0]).toBe("banan");
});

describe("trySolution", () => {
  it("only counts letters once", () => {
    Game.update(($game) => {
      $game.board = ["lamma"];
      $game.solution = "drama";
      return $game;
    });
    expect(get(Game).solution).toBe("drama");
    expect(get(Game).board[0]).toBe("lamma");
    expect(get(Game).hints).toEqual([]);
    Game.trySolution();
    expect(get(Game).hints[0]).toEqual([0, 1, 0, 2, 2]);
  });
});
