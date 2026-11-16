# Ordsnille – Wordle på Svenska

https://ordsnille.brusman.se

## Developing

Install the dependencies with `yarn install` and start a development server:

```bash
yarn dev
```

## Daily answers

Guesses use the broad `allWords` dictionary. From **16 November 2026 (local
midnight)**, answers use the separate, reviewed `src/lib/daily-answers.js` pool.
From **20 November 2026 (local midnight)**, they use
`src/lib/balanced-daily-answers.js`. Deploy before that date; if deployment is
delayed, move the new cutover date and its boundary tests forward before release
so an active puzzle does not change.

The pool starts with the original frequent-word list, excluding names, some
English words and less familiar entries. Familiar inflections and everyday
loanwords remain eligible. Entries are ordered by their oldest last appearance
in the historical schedule through 15 November 2026. The 839-word schedule
repeats after roughly 2.3 years. This is an editorial starting point, not a
corpus-backed frequency ranking.

The revised pool has three editorial tiers: 767 familiar answers, 386
intermediate words and 244 very rare words. Intermediate words include older
and literary words such as `fager`, `sämja` and `kutym`, contemporary words such
as `emoji` and `chatt`, and additions such as `dreja`, `bävan` and `sorla`.
Very rare words include `avrad`, `kvesa` and `triör`. The two added tiers are
listed in `src/lib/answer-tiers.js`; the dated answer schedule is a separate
snapshot, so changing a tier cannot silently change published puzzles.

About 45 percent of the answers are in the intermediate or very rare tiers.
Every rolling seven-day period has two to five answers from these tiers,
including across schedule repeats. Very rare words
follow four or five other answers, guaranteeing at least one in every rolling
seven-day period, including when the schedule repeats, without consecutive
very rare answers. The five- or six-day gaps move the rare answers between
weekdays. Both harder tiers cover all seven weekdays evenly, and neither tier
recurs on the same weekday in adjacent calendar weeks, including across repeats.
The remaining familiar answers retain their relative order from the previous
proposal. The 1,397-word schedule repeats after roughly 3.8 years.

Exclude words that were actually daily answers from **16 May through
16 November 2026, inclusive**, using the historical schedules. This fixed
six-month lookback is anchored to the review date, not a minimum interval
between a past answer and its future return. The 185 historical answers are
recorded in `src/lib/answer-tiers.js`; 138 were in the proposal and have been
removed entirely from the revised pool. They remain valid guesses, and the
historical schedules are unchanged.

Aim for a mix of familiar words and less common discoveries across generations,
including older vocabulary and modern loanwords. Players need not already know
every answer. Avoid letting obscure specialist terms dominate the schedule;
being a valid guess alone does not qualify a word as an answer. This is an
editorial selection, not a measured difficulty or frequency ranking.
Keep published answer arrays and their ordering stable. Future editorial changes
need a separately dated schedule to preserve past answers and ongoing games.
Game numbers continue from 7 January 2022; earlier schedules are preserved.
