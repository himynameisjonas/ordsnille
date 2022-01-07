import { writable } from "svelte/store";

function defaultValues() {
  return {
    scores: Array(6).fill(0),
  };
}

function createStats() {
  let startValue;
  if (typeof localStorage !== "undefined") {
    startValue = JSON.parse(localStorage.getItem("stats")) || defaultValues();
  } else {
    startValue = defaultValues();
  }

  const stats = writable(startValue);
  const { subscribe, update } = stats;

  if (typeof localStorage !== "undefined") {
    stats.subscribe((stats) => (localStorage.stats = JSON.stringify(stats)));
  }

  return {
    subscribe,
    addScore: (game) =>
      update(($stats) => {
        $stats.scores[game.boardIndex] = $stats.scores[game.boardIndex] + 1;
        return $stats;
      }),
  };
}

export default createStats();
