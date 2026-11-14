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
Deploy before that date; if deployment is delayed, move the cutover date and
its boundary tests forward before release so an active puzzle does not change.

The pool starts with the original frequent-word list, excluding names, some
English words and less familiar entries. Familiar inflections and everyday
loanwords remain eligible. Entries are ordered by their oldest last appearance
in the historical schedule through 15 November 2026. The 839-word schedule
repeats after roughly 2.3 years. This is an editorial starting point, not a
corpus-backed frequency ranking.

An answer should be recognisable to an ordinary Swedish speaker without
specialist knowledge. A word may be a valid guess without meeting that standard.
Keep published answer arrays and their ordering stable. Future editorial changes
need a separately dated schedule to preserve past answers and ongoing games.
Game numbers continue from 7 January 2022; earlier schedules are preserved.
