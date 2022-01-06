<script>
  import Board from "$lib/components/Board.svelte";
  import Keyboard from "$lib/components/Keyboard.svelte";
  import game from "$lib/stores/game.js";

  function handleKey({ detail: key }) {
    game.addLetter(key);
  }
</script>

<div class="flex flex-col h-screen justify-between py-2">
  <Board />
  <Keyboard on:delete={game.deleteLetter} on:enter={game.trySolution} on:key={handleKey} />
</div>
