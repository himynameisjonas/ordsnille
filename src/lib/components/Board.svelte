<script>
  import BoardLetter from "./BoardLetter.svelte";
  import game from "$lib/stores/game.js";
  const emptyArray = ["", "", "", "", ""];

  function lettersToArray(string) {
    let arr = Array.from(string);
    return [...arr, ...emptyArray].slice(0, 5);
  }
  function hintForLetter(hints, letterIndex) {
    if (hints) {
      return hints[letterIndex];
    } else {
      return "";
    }
  }
</script>
<div>
  {#each $game.board as row, boardIndex}
    <div class="flex row justify-center">
      {#each lettersToArray(row) as letter, letterIndex}
        <BoardLetter {letter} hint={hintForLetter($game.hints[boardIndex], letterIndex)} />
      {/each}
    </div>
  {/each}
</div>
