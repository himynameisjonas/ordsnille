import { writable, derived } from "svelte/store";

function defaultValues() {
  return {
    scores: Array(6).fill(0),
    failures: 0,
  };
}

export const stats = (function () {
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
    logSuccess: (game) =>
      update(($stats) => {
        $stats.scores[game.boardIndex] = $stats.scores[game.boardIndex] + 1;
        $stats.lastSolution = game.solution;
        $stats.lastStatus = "success";
        return $stats;
      }),
    logFailure: (game) =>
      update(($stats) => {
        $stats.failures = $stats.failures + 1;
        $stats.lastSolution = game.solution;
        $stats.lastStatus = "failure";
        return $stats;
      }),
  };
})();

export const graphs = derived(stats, ($stats) => {
  let totalWins = $stats.scores.reduce((score, sum) => score + sum, 0);
  return $stats.scores.map((score, index) => {
    return {
      points: index + 1,
      guesses: score,
      percentage: (score / totalWins) * 100,
    };
  });
});
