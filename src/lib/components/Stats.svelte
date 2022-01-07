<script>
  import game from "$lib/stores/game.js";
  import { todaysWord } from "$lib/stores/word.js";
</script>

<div class="mx-auto mt-5 w-[65ch] max-w-full px-5 text-gray-700 mb-auto">
  <h2 class="text-3xl mb-4 text-center font-abril">Statistik</h2>
  <p>Senaste ordet du spelade var {$game.solution}.</p>
</div>

{#if $game.solution != $todaysWord}
  <div class="px-5 my-auto">
    <button
      on:click={game.restart}
      class="w-full bg-green-500 text-white font-bold p-2 rounded my-5">Spela dagens ord</button
    >
  </div>
{/if}
