<script>
  import game, { hasWon, emojiResult } from "$lib/stores/game.js";
  import { gameNumber } from "$lib/stores/word.js";
  import { stats, graphs, plays, winPercentage } from "$lib/stores/stats";
  import { notifications } from "$lib/stores/notifications.js";
  import { todaysWord } from "$lib/stores/word.js";
  import { goto } from "$app/navigation";

  let canShare = false;

  function startTodaysGame() {
    game.restart();
    goto("/");
  }

  function goBack() {
    goto("/");
  }

  function shareData() {
    return {
      text: `Ordsnille nr${$gameNumber} (${
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
          notifications.warning("Något gick fel!");
        } finally {
          document.body.removeChild(textarea);
        }
      }
    } catch (err) {
      notifications.warning("Något gick fel!");
    }
  }

  $: if ($emojiResult && navigator.share && navigator.canShare && navigator.canShare(shareData())) {
    canShare = true;
  }
</script>

<div class="mx-auto mt-5 w-[65ch] max-w-full px-5 text-gray-700 mb-auto">
  {#if $plays > 0}
    <div class="mb-5 bg-white rounded-lg border shadow-inner p-4">
      Senaste ordet du spelade var
      <span class="bg-green-300 p-1 text-green-700 font-bold uppercase">{$stats.lastSolution}</span>
      (<a
        rel="noopener noreferrer"
        class="underline text-blue-400"
        target="_blank"
        href="https://svenska.se/tre/?sok={$stats.lastSolution}">svenska.se</a
      >) och du {#if $stats.lastStatus == "success"}gissade rätt{:else}hann inte gissa rätt{/if}.
      {#if $hasWon || $game.status == "completed"}
        {#if canShare}
          <h2 class="text-xl mt-5 mb-1 text-center font-abril">Dela ditt resultat</h2>
          <div
            class="w-full flex text-green-500 font-bold mt-2 border border-green-500 rounded-lg mb-7"
          >
            <button
              type="button"
              on:click={share}
              class="items-center w-full flex justify-center  bg-gray-50  font-bold p-2 rounded-lg "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2"
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
              class="items-center w-full flex justify-center  bg-gray-50  font-bold p-2 rounded-r-lg border-l border-green-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mr-2"
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
            class="w-full flex justify-center text-green-500 bg-gray-50 border border-green-500 font-bold p-2 rounded-lg mt-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6 mr-2"
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
      {#if $game.solution != $todaysWord}
        <button
          on:click={startTodaysGame}
          class="mt-3 w-full flex justify-center bg-green-500 text-white font-bold p-2 rounded shadow-md shadow-green-500/50"
        >
          Spela dagens ord
        </button>
      {:else if $game.solution == $todaysWord && ($game.status == "started" || $game.status == "new")}
        <button
          on:click={goBack}
          class="mt-3 w-full flex justify-center bg-green-500 text-white font-bold p-2 rounded shadow-md shadow-green-500/50"
        >
          Fortsätt spela dagens ord
        </button>
      {:else}
        <h2 class="text-xl mt-3 mb-1 text-center font-abril">Ett nytt ord kommer i morgon!</h2>
      {/if}
    </div>
  {:else}
    <div class="mb-5 bg-white rounded-lg border shadow-inner p-4">
      Du har in inte spelat något spel ännu… <a class="underline text-blue-400" href="/"
        >Börja med det först</a
      >.
    </div>
  {/if}

  <div class="mb-5 bg-white rounded-lg border shadow-inner p-4">
    <h2 class="text-xl mb-1 text-center font-abril">Statistik</h2>
    <div class="flex text-center flex-wrap">
      <div class="w-1/2 mb-4">
        <strong class="text-2xl block">{$plays}</strong>
        <span class="text-xs uppercase">antal spel</span>
      </div>
      <div class="w-1/2 mb-4">
        <strong class="text-2xl block">{$winPercentage}</strong>
        <span class="text-xs uppercase">% vinster</span>
      </div>
      <div class="w-1/2 mb-4">
        <strong class="text-2xl block">{$stats.currentStreak}</strong>
        <span class="text-xs uppercase">nuvarande segerserie</span>
      </div>
      <div class="w-1/2 mb-4">
        <strong class="text-2xl block">{$stats.maxStreak}</strong>
        <span class="text-xs uppercase">högsta segerserie</span>
      </div>
    </div>
  </div>
  <div class="mb-5 bg-white rounded-lg border shadow-inner p-4">
    <h2 class="text-xl mb-1 text-center font-abril">Antal vunna spel per antal gissningar</h2>
    <table>
      <tbody>
        {#each $graphs as score}
          <tr class="border-b">
            <td class="font-bold pr-1">{score.points}</td>
            <td width="100%">
              <div class="flex items-center">
                <div class="h-4 bg-green-300 rounded-r" style="width: {score.percentage}%" />
                <div class="ml-1 text-xs">{score.guesses}</div>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
