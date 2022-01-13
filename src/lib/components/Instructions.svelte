<script>
  import game, { firstLoad } from "$lib/stores/game.js";
  import { goto } from "$app/navigation";
  import { colorBlindness } from "$lib/stores/settings";
  import BoardLetter from "./BoardLetter.svelte";

  function start() {
    game.start();
    firstLoad.set(false);
    goto("/");
  }
</script>

<div class="mx-auto mt-5 w-[65ch] max-w-full px-5 text-gray-700 mb-auto">
  <div class="bg-white rounded-lg border shadow-inner p-4">
    <h2 class="text-3xl mb-4 text-center font-abril">Gissa dagens ord</h2>
    <h3 class="text-xl mb-2 font-abril">Instruktioner</h3>
    <ul class="list-disc list-outside ml-4">
      <li class="mb-2">Du har 6 försök på dig att komma fram till det rätta svaret.</li>
      <li class="mb-2">Varje gissning måste vara ett giltigt ord på 5 bokstäver.</li>
      <li class="mb-2">
        Tryck på <span
          class="h-7 rounded m-[2px] bg-slate-500 uppercase text-white font-bold w-8 inline-block "
        >
          <span class="flex items-center justify-center h-full w-full">⏎</span>
        </span>
        för att testa din gissning.
      </li>
      <li class="mb-2">Efter varje försök markeras bokstäverna som är med i det rätta svaret.</li>
    </ul>

    <h3 class="text-xl mb-2 mt-5 font-abril">Exempel</h3>
    <div class="mb-5">
      <div class="flex">
        <BoardLetter smallSize={true} letter="r" hint={null} />
        <BoardLetter smallSize={true} letter="å" hint="2" />
        <BoardLetter smallSize={true} letter="r" hint={null} />
        <BoardLetter smallSize={true} letter="i" hint={null} />
        <BoardLetter smallSize={true} letter="s" hint={null} />
      </div>
      Här betyder det att bokstaven
      <strong>Å</strong> är med i det rätta svaret och att den är på <em>rätt</em> plats.
    </div>

    <div class="mb-5">
      <div class="flex">
        <BoardLetter smallSize={true} letter="c" hint={null} />
        <BoardLetter smallSize={true} letter="u" hint={null} />
        <BoardLetter smallSize={true} letter="r" hint={null} />
        <BoardLetter smallSize={true} letter="r" hint={null} />
        <BoardLetter smallSize={true} letter="y" hint="1" />
      </div>
      Här betyder det att bokstaven
      <strong>Y</strong> är med i det rätta svaret men att den är på <em>fel</em> plats.
    </div>

    <div class="mb-5">
      <div class="flex">
        <BoardLetter smallSize={true} letter="l" hint={null} />
        <BoardLetter smallSize={true} letter="å" hint={null} />
        <BoardLetter smallSize={true} letter="d" hint={null} />
        <BoardLetter smallSize={true} letter="a" hint={null} />
        <BoardLetter smallSize={true} letter="n" hint="0" />
      </div>
      Här betyder det att bokstaven
      <strong>N</strong> inte är med i det rätta svaret över huvud taget.
    </div>

    <button
      on:click={start}
      class="w-full flex justify-center bg-green-500 text-white font-bold p-2 rounded my-10 shadow-md shadow-green-500/50"
    >
      {#if $game.status == "new"}
        Starta spelet och börja gissa
      {:else}
        Stäng
      {/if}
    </button>
    <div class="py-3 text-sm border-t text-center">
      <h2 class="text-xl mb-1 text-center font-abril">Inställningar</h2>

      <div class="flex justify-center">
        <div class="form-check form-switch">
          <input
            bind:checked={$colorBlindness}
            class="form-check-input float-left h-5 align-top cursor-pointer mr-2"
            type="checkbox"
            role="switch"
            id="color-blind-checkbox"
          />
          <label class="form-check-label inline-block text-gray-800" for="color-blind-checkbox"
            >Färgblindläge</label
          >
        </div>
      </div>
    </div>

    <div class="py-3 text-sm border-t text-center">
      Vid frågor, kontakta mig via
      <a class="underline text-blue-400" href="mailto:ordsnille@brusman.se">Email</a> eller
      <a
        class="underline text-blue-400"
        target="_blank"
        rel="noopener noreferrer"
        href="https://twitter.com/himynameisjonas">Twitter</a
      >.
    </div>
  </div>
</div>
