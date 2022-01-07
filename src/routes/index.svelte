<script>
  import Top from "$lib/components/Top.svelte";
  import Board from "$lib/components/Board.svelte";
  import Keyboard from "$lib/components/Keyboard.svelte";
  import Stats from "$lib/components/Stats.svelte";
  import game from "$lib/stores/game.js";
  import words from "$lib/words";
  import { notifications } from "$lib/stores/notifications.js";
  import { todaysWord } from "$lib/stores/word.js";
  import Toast from "$lib/components/Toast.svelte";
  import { beforeUpdate } from "svelte";
  import { goto } from "$app/navigation";

  beforeUpdate(() => {
    if ($game.status == "new" || !$game.status) {
      goto("/instructions");
    }
  });

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

<Top />
{#if $game.solution == $todaysWord && $game.status != "completed"}
  <Board />
  <Keyboard on:delete={game.deleteLetter} on:enter={trySolution} on:key={handleKey} />
{:else}
  <Stats />
{/if}

<Toast />
