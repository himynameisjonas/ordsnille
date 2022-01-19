import { get } from "svelte/store";

import Game from "./game.js";
beforeEach(() => {
  Game.restart();
});

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

  it("only counts letters once, check 2", () => {
    Game.update(($game) => {
      $game.board = ["ridån"];
      $game.solution = "råris";
      $game.boardIndex = 0;
      $game.hints = [];
      return $game;
    });
    expect(get(Game).solution).toBe("råris");
    expect(get(Game).board[0]).toBe("ridån");
    expect(get(Game).hints).toEqual([]);
    Game.trySolution();
    expect(get(Game).hints[0]).toEqual([2, 1, 0, 1, 0]);
  });

  it("supports multiple of the same letters on both solution and guess", () => {
    Game.update(($game) => {
      $game.board = ["täppt"];
      $game.solution = "uppåt";
      $game.boardIndex = 0;
      $game.hints = [];
      return $game;
    });
    expect(get(Game).solution).toBe("uppåt");
    expect(get(Game).board[0]).toBe("täppt");
    expect(get(Game).hints).toEqual([]);
    Game.trySolution();
    expect(get(Game).hints[0]).toEqual([0, 0, 2, 1, 2]);
  });
});
