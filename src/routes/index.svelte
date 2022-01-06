<script>
  import Board from "$lib/components/Board.svelte";
  import Keyboard from "$lib/components/Keyboard.svelte";
  import game from "$lib/stores/game.js";
  import words from "$lib/words";
  import { notifications } from "$lib/stores/notifications.js";
  import Toast from "$lib/components/Toast.svelte";

  function handleKey({ detail: key }) {
    game.addLetter(key);
  }

  function trySolution() {
    let attempt = $game.board[$game.boardIndex];
    if (attempt.length == 5) {
      if (words.includes(attempt)) {
        game.trySolution();
      } else {
        notifications.warning("Inte med i ordlistan");
      }
    }
  }
</script>

<Board />
<Keyboard on:delete={game.deleteLetter} on:enter={trySolution} on:key={handleKey} />

<Toast />
