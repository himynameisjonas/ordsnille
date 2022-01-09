<script>
  import game, { hasWon, emojiResult, gameNumber } from "$lib/stores/game.js";
  import { stats, graphs, plays, winPercentage } from "$lib/stores/stats";
  import { notifications } from "$lib/stores/notifications.js";
  import { todaysWord } from "$lib/stores/word.js";

  async function share() {
    window.plausible("share", {
      props: {
        gameNumber: $gameNumber,
        boardIndex: $game.boardIndex,
        solution: $game.solution,
        currentStreak: $stats.currentStreak,
        maxStreak: $stats.maxStreak,
      },
    });

    const shareData = {
      text: `Ordsnille nr${$gameNumber} (${$game.boardIndex + 1}/6)\n${$emojiResult}`,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareData.text);
        notifications.success("Kopierat resultatet!");
      }
    } catch (err) {
      notifications.warning("Något gick fel!");
    }
  }
</script>

<div class="mx-auto mt-5 w-[65ch] max-w-full px-5 text-gray-700 mb-auto">
  <p class="mb-5 bg-white rounded-lg border shadow-inner p-4">
    Senaste ordet du spelade var <a
      rel="noopener noreferrer"
      target="_blank"
      href="https://svenska.se/tre/?sok={$stats.lastSolution}"
      class="bg-green-300 p-1 text-green-700 font-bold uppercase">{$stats.lastSolution}</a
    >
    och du {#if $stats.lastStatus == "success"}gissade rätt{:else}hann inte gissa rätt{/if}.
    {#if $hasWon}
      <button
        on:click={share}
        class="w-full flex justify-center text-green-500 bg-gray-50 border border-green-500 font-bold p-2 rounded-lg mt-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
          />
        </svg>
        Dela ditt resultat</button
      >
    {/if}
  </p>

  <div class="mb-5 bg-white rounded-lg border shadow-inner p-4">
    <h2 class="text-xl mb-1 text-center font-abril">Statistik</h2>
    <div class="flex text-center flex-wrap">
      <div class="w-1/2 mb-4">
        <strong class="text-2xl block">{$plays}</strong>
        <span class="text-xs uppercase">antal spel</span>
      </div>
      <div class="w-1/2 mb-4">
        <strong class="text-2xl block">{$winPercentage}</strong>
        <span class="text-xs uppercase">% vinster</span>
      </div>
      <div class="w-1/2 mb-4">
        <strong class="text-2xl block">{$stats.currentStreak}</strong>
        <span class="text-xs uppercase">nuvarande segerserie</span>
      </div>
      <div class="w-1/2 mb-4">
        <strong class="text-2xl block">{$stats.maxStreak}</strong>
        <span class="text-xs uppercase">högsta segerserie</span>
      </div>
    </div>
  </div>
  <div class="mb-5 bg-white rounded-lg border shadow-inner p-4">
    <h2 class="text-xl mb-1 text-center font-abril">Antal vunna spel per antal gissningar</h2>
    <table>
      <tbody>
        {#each $graphs as score}
          <tr class="border-b">
            <td class="font-bold pr-1">{score.points}</td>
            <td width="100%">
              <div class="flex items-center">
                <div class="h-4 bg-green-300 rounded-r" style="width: {score.percentage}%" />
                <div class="ml-1 text-xs">{score.guesses}</div>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<div class="p-5 my-auto pb-safe">
  {#if $game.solution != $todaysWord}
    <button
      on:click={game.restart}
      class="w-full bg-green-500 text-white font-bold p-2 rounded-lg my-5">Spela dagens ord</button
    >
  {:else}
    <h2 class="text-xl mb-1 text-center font-abril">Ett nytt ord kommer i morgon</h2>
  {/if}
</div>
