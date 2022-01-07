<script>
  import game from "$lib/stores/game.js";
  import { stats, graphs } from "$lib/stores/stats";
  import { todaysWord } from "$lib/stores/word.js";
</script>

<div class="mx-auto mt-5 w-[65ch] max-w-full px-5 text-gray-700 mb-auto">
  <h2 class="text-3xl mb-4 text-center font-abril">Resultat</h2>
  <p class="mb-5">
    Du {#if $stats.lastStatus == "success"}lyckades{:else}misslyckades{/if} i senaste spelet. Det rätta
    ordet var
    <span class="bg-green-300 p-1 text-green-700 font-bold uppercase">{$stats.lastSolution}</span>.
  </p>

  <h3 class="text-xl mb-1 text-center font-abril">Antal gissningar i vunna spel</h3>
  <table>
    <tbody>
      {#each $graphs as score}
        <tr class="border-b">
          <td class="font-bold pr-1">{score.points}</td>
          <td width="100%">
            <div class="flex items-center">
              <div class="h-4 bg-green-300 rounded-r" style="width: {score.percentage}%" />
              <div class="ml-1 text-sm">{score.guesses}</div>
            </div>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<div class="px-5 my-auto">
{#if $game.solution != $todaysWord}
    <button
      on:click={game.restart}
      class="w-full bg-green-500 text-white font-bold p-2 rounded my-5">Spela dagens ord</button
    >
  {:else}
    <h3 class="text-xl mb-1 text-center font-abril">Ett nytt ord kommer i morgon</h3>
  {/if}
</div>
