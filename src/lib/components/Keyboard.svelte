<script>
  import { createEventDispatcher, onMount } from "svelte";
  import game, { timeForHint } from "$lib/stores/game.js";
  import { all as allLetters } from "$lib/stores/letters.js";
  import KeyboardButton from "./KeyboardButton.svelte";

  const dispatch = createEventDispatcher();

  function* chunks(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
      yield arr.slice(i, i + n);
    }
  }

  function handleKeyDown(event) {
    if (event.ctrlKey || event.altKey || event.metaKey || event.shiftKey) return;
    if ($allLetters.has(event.key.toLowerCase())) {
      dispatch("key", event.key);
    } else if (event.key == " ") {
      event.preventDefault();
      dispatch("key", " ");
    } else if (event.key == "ArrowLeft") {
      event.preventDefault();
      dispatch("move", -1);
    } else if (event.key == "ArrowRight") {
      event.preventDefault();
      dispatch("move", 1);
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
</script>

<div class="pb-safe" translate="no">
  {#each [...chunks(Array.from($allLetters), 11)] as row, index (row)}
    <div class="flex justify-center">
      {#if index == 2}
        <button
          on:click={() => dispatch("enter")}
          class="m-[2px] flex h-14 w-20 items-center justify-center rounded-sm bg-slate-500 font-bold text-white uppercase"
        >
          <span
            class="animate__animated animate__infinite animate__slow animate__repeat-3"
            class:animate__bounce={$timeForHint && $game.status != "completed"}>⏎</span
          >
        </button>
      {/if}
      {#each row as key (key)}
        <KeyboardButton {key} on:click={() => handleClick(key)} />
      {/each}
      {#if index == 2}
        <button
          on:click={() => dispatch("delete")}
          class="m-[2px] flex h-14 w-20 items-center justify-center rounded-sm bg-slate-500 font-bold text-white uppercase"
          aria-label="Delete"
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
