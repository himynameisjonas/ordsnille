<script>
  import Top from "$lib/components/Top.svelte";
  import Board from "$lib/components/Board.svelte";
  import Keyboard from "$lib/components/Keyboard.svelte";
  import Toast from "$lib/components/Toast.svelte";
  import game, { firstLoad } from "$lib/stores/game.js";
  import { allWords } from "$lib/words";
  import { notifications } from "$lib/stores/notifications.js";
  import { beforeUpdate } from "svelte";
  import { goto } from "$app/navigation";
  import { todaysWord } from "$lib/stores/word.js";
  import throttle from "just-throttle";

  beforeUpdate(() => {
    if ($game.status == "new" || !$game.status) {
      goto("/instruktioner");
    } else if ($game.status == "completed" && $firstLoad) {
      goto("/statistik");
    } else if (game.solution != $todaysWord && $firstLoad) {
      goto("/statistik");
    }
    firstLoad.set(false);
  });

  const handleKey = throttle(
    ({ detail: key }) => {
      if ($game.status == "completed" || $game.solution != $todaysWord) return;
      game.addLetter(key);
    },
    10,
    { leading: true }
  );

  const deleteLetter = throttle(
    () => {
      if ($game.status == "completed" || $game.solution != $todaysWord) return;
      game.deleteLetter();
    },
    10,
    { leading: true }
  );
  const trySolution = throttle(
    async () => {
      if ($game.status == "completed" || $game.solution != $todaysWord) {
        return goto("/statistik");
      }
      let attempt = $game.board[$game.boardIndex];
      if (attempt.length == 5) {
        if (allWords.includes(attempt)) {
          game.trySolution();
        } else {
          notifications.warning("Inte med i ordlistan");
          fetch("/word", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ attempt }),
          });
        }
      }
    },
    1000,
    { leading: true }
  );

  function startTodaysGame() {
    game.restart();
  }
</script>

<Top />
<Board />
{#if $game.solution == $todaysWord}
  <Keyboard on:delete={deleteLetter} on:enter={trySolution} on:key={handleKey} />
{:else}
  <button
    on:click={startTodaysGame}
    class="mb-10 px-20 mx-auto flex justify-center bg-green-500 text-white font-bold p-2 rounded shadow-md shadow-green-500/50"
  >
    Spela dagens ord
  </button>
{/if}

<Toast />
