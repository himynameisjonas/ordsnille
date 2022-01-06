<script>
  import game from "$lib/stores/game.js";
  import { goto } from "$app/navigation";

  function start() {
    game.start();
    goto("/");
  }
</script>

<div class="m-auto w-[65ch] max-w-full p-5">
  <h2 class="text-2xl font-bold">Försök gissa order på 6 försök</h2>
  <p>
    Varje försök ger ledtrådar till det rätta svaret, <span
      class="bg-green-300 p-1 text-green-700 font-bold uppercase">gröna</span
    >
    bokstäver betyder att det är rätt bokstav på rätt plats, en
    <span class="bg-orange-200 p-1 text-orange-600 font-bold uppercase">orange</span> bokstav betyder
    att den bokstaven finns med i det rätta svaret men att den är på fel plats.
  </p>
  <button on:click={start} class="w-full bg-green-500 text-white font-bold p-2 rounded my-5"
    >Starta</button
  >
</div>
