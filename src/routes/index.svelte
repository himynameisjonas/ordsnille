<script>
  import Board from "$lib/components/Board.svelte";
  import Keyboard from "$lib/components/Keyboard.svelte";
  import game from "$lib/stores/game.js";

  function handleKey({ detail: key }) {
    game.addLetter(key);
  }

  function handleEnter() {
    console.log("hej enter");
  }
</script>

<Board />
<Keyboard on:delete={game.deleteLetter} on:enter={handleEnter} on:key={handleKey} />
