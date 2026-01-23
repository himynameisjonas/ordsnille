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
  import {
    currentWord,
    allWordsPlayed,
    gamesPlayed,
    totalWords,
    resetProgress,
  } from "$lib/stores/word.js";
  import throttle from "just-throttle";

  beforeUpdate(() => {
    if ($game.status == "new" || !$game.status) {
      goto("/instruktioner");
    } else if ($game.status == "completed" && $firstLoad) {
      goto("/resultat");
    } else if (game.solution != $currentWord && $firstLoad) {
      goto("/resultat");
    }
    firstLoad.set(false);
  });

  const handleKey = throttle(
    ({ detail: key }) => {
      if ($game.status == "completed" || $game.solution != $currentWord) return;
      game.addLetter(key);
    },
    10,
    { leading: true }
  );

  const deleteLetter = throttle(
    () => {
      if ($game.status == "completed" || $game.solution != $currentWord) return;
      game.deleteLetter();
    },
    10,
    { leading: true }
  );
  const trySolution = throttle(
    async () => {
      if ($game.status == "completed" || $game.solution != $currentWord) {
        return goto("/resultat");
      }
      let attempt = $game.board[$game.boardIndex];
      if (attempt.length == 5) {
        if (allWords.includes(attempt)) {
          game.trySolution();
        } else {
          notifications.warning("Inte med i ordlistan");
          game.invalidWord();
        }
      }
    },
    1000,
    { leading: true }
  );

  function startNextGame() {
    game.restart();
    goto("/");
  }

  function restartAll() {
    resetProgress();
    game.restart();
    goto("/");
  }
</script>

<Top />
<Board />
{#if $game.solution == $currentWord && !$allWordsPlayed}
  <Keyboard on:delete={deleteLetter} on:enter={trySolution} on:key={handleKey} />
{:else if !$allWordsPlayed}
  <button
    on:click={startNextGame}
    class="mx-auto mb-10 flex justify-center rounded-sm bg-green-500 p-2 px-20 font-bold text-white shadow-md shadow-green-500/50"
    title={`Spela ord ${Math.min($gamesPlayed + 1, totalWords)} av ${totalWords}`}
  >
    Spela nästa ord
  </button>
{:else}
  <div class="mx-auto mb-10 text-center text-gray-600">
    <p class="text-lg font-semibold">Du har spelat alla ord!</p>
    <button
      on:click={restartAll}
      class="mt-3 flex w-full justify-center rounded-sm bg-green-500 p-2 font-bold text-white shadow-md shadow-green-500/50"
    >
      Börja om från början
    </button>
  </div>
{/if}

<Toast />
