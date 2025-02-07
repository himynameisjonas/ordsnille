<script>
  import { goto } from "$app/navigation";

  function refresh(event) {
    event.preventDefault();
    goto("/");
  }
</script>

<div
  class="flex items-center justify-center border-b-[3px] border-b-green-400 bg-green-100 py-0.5 pt-safe"
>
  <a href="/statistik" class="ml-3 text-gray-500" aria-label="Statistik"
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

  <h1 class="mx-auto font-abril text-5xl uppercase text-gray-500 hover:cursor-pointer">
    <a href="/" on:click={refresh}>
      <span class="text-green-500">Ord</span>snille
    </a>
  </h1>
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
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg></a
  >
</div>
