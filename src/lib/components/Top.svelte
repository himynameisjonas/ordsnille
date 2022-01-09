<script>
  function refresh() {
    window.location.reload();
  }
</script>

<div
  class="py-0.5 pt-safe bg-green-100 flex justify-center items-center border-b-[3px] border-b-green-400"
>
  <span class="flex w-6 h-6" />
  <h1
    on:click={refresh}
    class="hover:cursor-pointer text-5xl uppercase text-gray-500 font-abril mx-auto"
  >
    <span class="text-green-500">Ord</span>snille
  </h1>
  <a href="/instruktioner" class="text-gray-500 mr-2"
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
