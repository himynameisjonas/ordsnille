<script>
  import { goto } from "$app/navigation";
  import { gamesPlayed, totalWords } from "$lib/stores/word.js";

  function refresh(event) {
    event.preventDefault();
    goto("/");
  }
</script>

<div
  class="pt-safe flex items-center justify-center border-b-[3px] border-b-green-400 bg-green-100 py-0.5"
>
  <a href="/resultat" class="ml-3 text-gray-500" aria-label="Resultat"
    ><svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"
      />
    </svg></a
  >

  <div class="mx-auto flex flex-col items-center">
    <h1 class="font-abril text-5xl text-gray-500 uppercase hover:cursor-pointer">
      <a href="/" on:click={refresh}>
        <span class="text-green-500">Ord</span>snille
      </a>
    </h1>
    <span class="text-xs font-semibold text-gray-500 uppercase">
      Ord {Math.min($gamesPlayed + 1, totalWords)} av {totalWords}
    </span>
  </div>
  <a href="/instruktioner" class="mr-3 text-gray-500" aria-label="Instruktioner"
    ><svg
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
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 0 0118 0z"
      />
    </svg></a
  >
</div>
