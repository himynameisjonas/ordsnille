<script>
  import BoardLetter from "./BoardLetter.svelte";
  import game from "$lib/stores/game.js";
  const emptyArray = ["", "", "", "", ""];

  function lettersToArray(string) {
    let arr = Array.from(string);
    return [...arr, ...emptyArray].slice(0, 5);
  }
</script>

<div translate="no">
  {#each $game.board as row, boardIndex}
    <div class="row flex justify-center">
      {#each lettersToArray(row) as letter, letterIndex}
        <BoardLetter {letter} {letterIndex} {boardIndex} />
      {/each}
    </div>
  {/each}
</div>
