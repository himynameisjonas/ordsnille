<script>
  import game, { firstLoad } from "$lib/stores/game.js";
  import { goto } from "$app/navigation";
  import { colorBlindness } from "$lib/stores/settings";
  import BoardLetter from "./BoardLetter.svelte";
  import { slide } from "svelte/transition";

  function start() {
    game.start();
    firstLoad.set(false);
    goto("/");
  }
</script>

<div in:slide class="mx-auto mt-5 mb-auto w-[65ch] max-w-full px-5 text-gray-700">
  <div class="rounded-lg border bg-white p-4 shadow-inner">
    <h2 class="font-abril mb-4 text-center text-3xl">Gissa dagens ord</h2>
    <h3 class="font-abril mb-2 text-xl">Instruktioner</h3>
    <ul class="ml-4 list-outside list-disc">
      <li class="mb-2">Du har 6 försök på dig att komma fram till det rätta svaret.</li>
      <li class="mb-2">Varje gissning måste vara ett giltigt ord på 5 bokstäver.</li>
      <li class="mb-2">
        Tryck på <span
          class="m-[2px] inline-block h-7 w-8 rounded-sm bg-slate-500 font-bold text-white uppercase"
        >
          <span class="flex h-full w-full items-center justify-center">⏎</span>
        </span>
        för att testa din gissning.
      </li>
      <li class="mb-2">Efter varje försök markeras bokstäverna som är med i det rätta svaret.</li>
    </ul>

    <h3 class="font-abril mt-5 mb-2 text-xl">Exempel</h3>
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
      class="my-10 flex w-full justify-center rounded-sm bg-green-500 p-2 font-bold text-white shadow-md shadow-green-500/50"
    >
      {#if $game.status == "new"}
        Starta spelet och börja gissa
      {:else}
        Stäng
      {/if}
    </button>
    <div class="border-t py-3 text-center text-sm">
      <h2 class="font-abril mb-1 text-center text-xl">Inställningar</h2>

      <div class="flex justify-center">
        <div class="form-check form-switch">
          <input
            bind:checked={$colorBlindness}
            class="form-check-input float-left mr-2 h-5 cursor-pointer align-top"
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

    <div class="border-t py-3 text-center text-sm">
      Vid frågor, kontakta mig via
      <a class="text-blue-400 underline" href="mailto:ordsnille@brusman.se">Email</a> eller
      <a
        class="text-blue-400 underline"
        target="_blank"
        rel="noopener noreferrer"
        href="https://tacocat.space/@jonas">Mastodon</a
      >.
    </div>
  </div>
</div>
