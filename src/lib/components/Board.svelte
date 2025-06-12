<script>
  import BoardLetter from "./BoardLetter.svelte";
  import { fade } from "svelte/transition";
  import game from "$lib/stores/game.js";
  const emptyArray = ["", "", "", "", ""];

  function lettersToArray(string) {
    let arr = Array.from(string);
    return [...arr, ...emptyArray].slice(0, 5);
  }
</script>

<div in:fade translate="no">
  {#each $game.board as row, boardIndex}
    <div class="row flex justify-center">
      {#each lettersToArray(row) as letter, letterIndex}
        {#key letter + "-" + letterIndex + "-" + boardIndex}
          <BoardLetter {letter} {letterIndex} {boardIndex} />
        {/key}
      {/each}
    </div>
  {/each}
</div>
