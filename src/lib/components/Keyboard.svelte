<script>
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher();

  import { present, correct, absent } from "$lib/stores/letters.js";

  let rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "å"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];
  function handleClick(key) {
    dispatch("key", key);
  }
</script>

<div>
  {#each rows as row, index}
    <div class="flex justify-center">
      {#if index == 2}
        <button
          on:click={() => dispatch("enter")}
          class="h-14 rounded m-[2px] bg-slate-400 uppercase text-white font-bold w-20 flex items-center justify-center"
        >
          ⏎
        </button>
      {/if}
      {#each row as key}
        <button
          on:click={() => handleClick(key)}
          class="h-14 rounded m-[2px] bg-slate-400 uppercase text-white font-bold w-10 flex items-center justify-center"
          class:bg-green-500={$correct.has(key)}
          class:bg-yellow-500={$present.has(key) && !$correct.has(key)}
          class:bg-slate-300={$absent.has(key)}
          class:bg-slate-400={!$present.has(key) && !$correct.has(key)}
        >
          {key}
        </button>
      {/each}
      {#if index == 2}
        <button
          on:click={() => dispatch("delete")}
          class="h-14 rounded m-[2px] bg-slate-400 uppercase text-white font-bold w-20 flex items-center justify-center"
        >
          ⌫
        </button>
      {/if}
    </div>
  {/each}
</div>
