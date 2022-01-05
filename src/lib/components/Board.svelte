<script>
  import BoardLetter from "./BoardLetter.svelte";
  import game from "$lib/stores/game.js";
  const emptyArray = ["", "", "", "", ""];

  function lettersToArray(string) {
    let arr = Array.from(string);
    return [...arr, ...emptyArray].slice(0, 5);
  }
</script>

{#each $game as row}
  <div class="flex row justify-center">
    {#each lettersToArray(row) as letter}
      <BoardLetter {letter} />
    {/each}
  </div>
{/each}
