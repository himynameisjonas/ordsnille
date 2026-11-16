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

The revised pool keeps all 839 answers and adds 100 hand-picked words, including
older and literary words such as `fager`, `sämja` and `kutym`, and contemporary
words such as `emoji` and `chatt`. Each addition follows eight or nine answers
from the familiar pool, avoiding runs of only less familiar words. The existing
sequence continues where the previous schedule left off; its first four words
move to the end of that sequence. The 939-word schedule repeats after roughly
2.6 years.

Aim for a mix of familiar words and less common discoveries across generations,
including older vocabulary and modern loanwords. Players need not already know
every answer. Avoid letting obscure specialist terms dominate the schedule;
being a valid guess alone does not qualify a word as an answer. This is an
editorial selection, not a measured difficulty or frequency ranking.
Keep published answer arrays and their ordering stable. Future editorial changes
need a separately dated schedule to preserve past answers and ongoing games.
Game numbers continue from 7 January 2022; earlier schedules are preserved.
