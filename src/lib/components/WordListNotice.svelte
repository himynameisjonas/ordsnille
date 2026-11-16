<script>
  import { gameNumber } from "$lib/stores/word.js";
  import { gameNumberForDate } from "$lib/daily-word.js";

  const expiresOnGame = gameNumberForDate(new Date(2026, 11, 1));
</script>

{#if $gameNumber < expiresOnGame}
  <aside
    aria-labelledby="word-list-notice-title"
    class="my-5 border-y border-green-300 bg-green-50 px-4 py-4 text-green-950 dark:border-green-800 dark:bg-green-950 dark:text-green-100"
  >
    <h2 id="word-list-notice-title" class="font-abril text-xl text-balance">
      En ny blandning av ord
    </h2>
    <p class="mt-2 leading-relaxed">
      Det blev lite väl många ovanliga ord på rad. Från <time datetime="2026-11-20"
        >20 november 2026</time
      > får dagens ord en genomgången ordlista. Både välbekanta ord och klurigare bekantskaper ska få
      plats, och tidigare ord får återkomma efter ett par år.
    </p>
  </aside>
{/if}
