# Ordsnille – Wordle på Svenska

https://ordsnille.brusman.se

## Developing

Install the dependencies with `yarn install` and start a development server:

```bash
yarn dev
```

## Daily answers

From 20 November 2026, daily answers use `src/lib/balanced-daily-answers.js`.
Difficulty groups are in `src/lib/answer-tiers.js`; accepted guesses are in
`src/lib/words.js`.

Keep published schedules unchanged. Use a new start date for future revisions
so past answers and ongoing games stay intact.
