<script>
  import Top from "$lib/components/Top.svelte";
  import Stats from "$lib/components/Stats.svelte";
  import Toast from "$lib/components/Toast.svelte";
  import game, { firstLoad } from "$lib/stores/game.js";
  import { resetProgress } from "$lib/stores/word.js";
  import { beforeUpdate } from "svelte";
  import { goto } from "$app/navigation";

  beforeUpdate(() => {
    firstLoad.set(false);
  });

  function resetAllProgress() {
    resetProgress();
    game.restart();
    goto("/");
  }
</script>

<Top />
<Stats />
<button
  on:click={resetAllProgress}
  class="mx-auto mt-4 mb-10 flex w-full max-w-xl justify-center rounded-sm bg-red-500 p-2 font-bold text-white shadow-md shadow-red-500/50"
>
  Nollställ allt och börja om
</button>
<Toast />
