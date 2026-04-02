<script>
  import game, { hasPlayed, hasWon, emojiResult } from "$lib/stores/game.js";
  import { gamesPlayed, totalWords, allWordsPlayed, resetProgress } from "$lib/stores/word.js";
  import { notifications } from "$lib/stores/notifications.js";
  import { goto } from "$app/navigation";
  import { slide } from "svelte/transition";

  let canShare = false;

  function startNextGame() {
    game.restart();
    goto("/");
  }

  function restartAll() {
    resetProgress();
    game.restart();
    goto("/");
  }

  function goBack() {
    goto("/");
  }

  $: wordsCompleted = Math.min($gamesPlayed, totalWords);
  $: nextWordNumber = Math.min(wordsCompleted + 1, totalWords);

  function shareData() {
    return {
      text: `Ordsnille ord ${wordsCompleted}/${totalWords} (${
        $hasWon ? $game.boardIndex + 1 : "X"
      }/6)\n${$emojiResult}`,
    };
  }

  async function share() {
    let share = shareData();

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(share)) {
        await navigator.share(share);
      } else {
        await copy();
      }
    } catch (err) {
      console.error(err);
      notifications.warning("Något gick fel!");
    }
  }

  async function copy() {
    let share = shareData();

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(share.text);
        notifications.success("Kopierat resultatet!");
      } else {
        var textarea = document.createElement("textarea");
        textarea.textContent = share.text;
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        try {
          await document.execCommand("copy");
          notifications.success("Kopierat resultatet!");
        } catch (err) {
          console.error(err);
          notifications.warning("Något gick fel!");
        } finally {
          document.body.removeChild(textarea);
        }
      }
    } catch (err) {
      console.error(err);
      notifications.warning("Något gick fel!");
    }
  }

  $: if ($emojiResult && navigator.share && navigator.canShare && navigator.canShare(shareData())) {
    canShare = true;
  } else {
    canShare = false;
  }
</script>

<div in:slide class="mx-auto mt-5 mb-auto w-[65ch] max-w-full px-5 text-gray-700">
  {#if $hasPlayed}
    <div class="mb-5 rounded-lg border bg-white p-4 shadow-inner">
      Senaste ordet var
      <span class="bg-green-300 p-1 font-bold text-green-700 uppercase">{$game.solution}</span>
      (<a
        rel="noopener noreferrer"
        class="text-blue-400 underline"
        target="_blank"
        href="https://svenska.se/tre/?sok={$game.solution}">svenska.se</a
      >) och du {#if $hasWon}gissade rätt{:else}gissade inte rätt{/if}.
      {#if $game.status == "completed"}
        {#if canShare}
          <h2 class="font-abril mt-5 mb-1 text-center text-xl">Dela ditt resultat</h2>
          <div
            class="mt-2 mb-7 flex w-full rounded-lg border border-green-500 font-bold text-green-500"
          >
            <button
              type="button"
              on:click={share}
              class="flex w-full items-center justify-center rounded-lg bg-gray-50 p-2 font-bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>

              Dela
            </button>
            <button
              on:click={copy}
              type="button"
              class="flex w-full items-center justify-center rounded-r-lg border-l border-green-500 bg-gray-50 p-2 font-bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              Kopiera
            </button>
          </div>
        {:else}
          <button
            on:click={share}
            class="mt-2 flex w-full justify-center rounded-lg border border-green-500 bg-gray-50 p-2 font-bold text-green-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
              />
            </svg>
            Dela ditt resultat
          </button>
        {/if}
      {/if}
      <p class="mt-4 text-center font-semibold">
        Du har klarat {wordsCompleted} av {totalWords} ord.
      </p>
      {#if $game.status != "completed"}
        <button
          on:click={goBack}
          class="mt-3 flex w-full justify-center rounded-sm bg-green-500 p-2 font-bold text-white shadow-md shadow-green-500/50"
        >
          Fortsätt spela
        </button>
      {:else if $allWordsPlayed}
        <h2 class="font-abril mt-3 mb-1 text-center text-xl">Alla ord är spelade!</h2>
        <button
          on:click={restartAll}
          class="mt-3 flex w-full justify-center rounded-sm bg-green-500 p-2 font-bold text-white shadow-md shadow-green-500/50"
        >
          Börja om från början
        </button>
      {:else}
        <button
          on:click={startNextGame}
          class="mt-3 flex w-full justify-center rounded-sm bg-green-500 p-2 font-bold text-white shadow-md shadow-green-500/50"
        >
          Spela ord {nextWordNumber} av {totalWords}
        </button>
      {/if}
    </div>
  {:else}
    <div class="mb-5 rounded-lg border bg-white p-4 shadow-inner">
      Du har inte spelat något spel ännu… <a class="text-blue-400 underline" href="/"
        >Börja med det först</a
      >.
    </div>
  {/if}
</div>
