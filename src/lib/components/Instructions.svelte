<script>
  import game from "$lib/stores/game.js";
  import { goto } from "$app/navigation";

  function start() {
    game.start();
    goto("/");
  }
</script>

<div class="m-auto w-[65ch] max-w-full p-5">
  <h2 class="text-lg font-bold">Försök gissa order på 6 försök</h2>
  <p>
    Varje försök ger ledtrådar till rätt ord,<span class="text-emerald-500 font-bold uppercase"
      >gröna</span
    >
    bokstäver betyder att det är rätt bokstav på rätt plats,
    <span class="text-fuchsia-500 font-bold uppercase">lila</span> bokstäver betyder att det bokstaven
    finns med i det rätta svaret men att den är på fel plats.
  </p>
  <button on:click={start} class="w-full bg-emerald-500 text-white font-bold p-2 rounded my-5"
    >Starta</button
  >
</div>
