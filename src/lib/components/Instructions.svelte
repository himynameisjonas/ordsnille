<script>
  import game from "$lib/stores/game.js";
  import { goto } from "$app/navigation";

  function start() {
    game.start();
    goto("/");
  }
</script>

<div class="mx-auto mt-5 w-[65ch] max-w-full px-5 text-gray-700">
  <h2 class="text-3xl mb-4 text-center font-abril">Gissa dagens ord</h2>
  <ul class="list-disc list-outside ml-4">
    <li class="mb-5">Du har 6 försök på dig att komma fram till det rätta svaret.</li>
    <li class="mb-5">Varje försök markerar de bokstäver som är med i det rätta svaret.</li>
    <li class="mb-5">
      <span class="bg-green-300 p-1 text-green-700 font-bold uppercase">gröna</span>
      bokstäver betyder att det är rätt bokstav på rätt plats.
    </li>
    <li class="mb-5">
      En <span class="bg-orange-200 p-1 text-orange-600 font-bold uppercase">orange</span> bokstav betyder
      att den bokstaven finns med i det rätta svaret men att den är på fel plats.
    </li>
    <li>
      Tryck på <span
        class="h-7 rounded m-[2px] bg-slate-500 uppercase text-white font-bold w-8 inline-block "
      >
        <span class="flex items-center justify-center h-full w-full">⏎</span>
      </span>
      för att testa din gissning.
    </li>
  </ul>
</div>
<div class="px-5 m-auto w-[65ch] max-w-full">
  <button on:click={start} class="w-full bg-green-500 text-white font-bold p-2 rounded my-5">
    {#if $game.status == "new"}
      Starta spelet och börja gissa
    {:else}
      Stäng
    {/if}
  </button>
</div>

<div class="p-5 mx-auto text-sm border-t w-[65ch] max-w-full px-5">
  Vid frågor, kontakta mig via
  <a class="underline text-blue-400" href="mailto:ordsnille@brusman.se">Email</a> eller
  <a
    class="underline text-blue-400"
    target="_blank"
    rel="noopener noreferrer"
    href="https://twitter.com/himynameisjonas">Twitter</a
  >.
</div>
