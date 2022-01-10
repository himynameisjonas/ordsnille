import { writable, derived, get } from "svelte/store";
import { gameNumber } from "$lib/stores/word.js";

function defaultValues() {
  return {
    scores: Array(6).fill(0),
    failures: 0,
    currentStreak: 0,
    maxStreak: 0,
    lastGameNumber: null,
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

        if ($stats.failures == 0) {
          $stats.currentStreak = $stats.scores.reduce((score, sum) => score + sum, 0);
        }

        if ($stats.lastGameNumber && $stats.lastGameNumber == get(gameNumber) - 1) {
          $stats.currentStreak = ($stats.currentStreak || 0) + 1;
        } else {
          $stats.currentStreak = 1;
        }

        $stats.maxStreak = Math.max($stats.currentStreak, $stats.maxStreak || 0);
        $stats.lastGameNumber = get(gameNumber);

        window.plausible("game-won", {
          props: {
            gameNumber: get(gameNumber),
            boardIndex: game.boardIndex,
            solution: game.solution,
            currentStreak: $stats.currentStreak,
            maxStreak: $stats.maxStreak,
          },
        });

        return $stats;
      }),
    logFailure: (game) =>
      update(($stats) => {
        $stats.failures = $stats.failures + 1;
        $stats.currentStreak = 0;
        $stats.lastSolution = game.solution;
        $stats.lastStatus = "failure";
        $stats.lastGameNumber = get(gameNumber);

        window.plausible("game-lost", {
          props: {
            gameNumber: get(gameNumber),
            solution: game.solution,
            attempt: game.board[5],
          },
        });

        return $stats;
      }),
  };
})();

export const totalWins = derived(stats, ($stats) => {
  return $stats.scores.reduce((score, sum) => score + sum, 0);
});

export const graphs = derived([totalWins, stats], ([$totalWins, $stats]) => {
  return $stats.scores.map((score, index) => {
    return {
      points: index + 1,
      guesses: score,
      percentage: (score / $totalWins) * 100,
    };
  });
});

export const plays = derived([totalWins, stats], ([$totalWins, $stats]) => {
  return $totalWins + $stats.failures;
});

export const winPercentage = derived([totalWins, plays], ([$totalWins, $plays]) => {
  let percentage = ($totalWins / $plays) * 100;
  return Math.round((percentage + Number.EPSILON) * 100) / 100;
});
