<script>
  import { createEventDispatcher, onMount } from "svelte";
  import game, { timeForHint } from "$lib/stores/game.js";
  import { colorBlindness } from "$lib/stores/settings.js";
  const dispatch = createEventDispatcher();

  import { present, correct, absent } from "$lib/stores/letters.js";

  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "å"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];

  const letters = rows.flat();

  function handleKeyDown(event) {
    if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) return;
    if (letters.includes(event.key)) {
      dispatch("key", event.key);
    } else if (event.key == "Backspace") {
      dispatch("delete");
    } else if (event.key == "Enter") {
      dispatch("enter");
    }
  }

  onMount(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  function handleClick(key) {
    dispatch("key", key);
  }

  function classesForKey(key) {
    if ($correct.has(key)) {
      if ($colorBlindness) {
        return "bg-sky-400 text-sky-800";
      } else {
        return "bg-green-400 text-green-700";
      }
    } else if ($present.has(key)) {
      if ($colorBlindness) {
        return "bg-yellow-300 text-yellow-700";
      } else {
        return "bg-orange-300 text-orange-600";
      }
    } else if ($absent.has(key)) {
      return "bg-gray-500 text-gray-400";
    } else {
      return "bg-slate-400";
    }
  }
</script>

<div class="pb-safe">
  {#each rows as row, index}
    <div class="flex justify-center">
      {#if index == 2}
        <button
          on:click={() => dispatch("enter")}
          class="h-14 rounded m-[2px] bg-slate-500 uppercase text-white font-bold w-20 flex items-center justify-center"
        >
          <span class:animate-bounce={$timeForHint && $game.status != "completed"}>⏎</span>
        </button>
      {/if}
      {#each row as key}
        <button
          on:click={() => handleClick(key)}
          class="h-14 rounded m-[2px] bg-slate-400 uppercase text-white font-bold w-10 flex items-center justify-center {classesForKey(
            key
          )}"
        >
          {key}
        </button>
      {/each}
      {#if index == 2}
        <button
          on:click={() => dispatch("delete")}
          class="h-14 rounded m-[2px] bg-slate-500 uppercase text-white font-bold w-20 flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"
            />
          </svg>
        </button>
      {/if}
    </div>
  {/each}
</div>
