<script>
  import Top from "$lib/components/Top.svelte";
  import Stats from "$lib/components/Stats.svelte";
  import Toast from "$lib/components/Toast.svelte";
  import { firstLoad } from "$lib/stores/game.js";
  import { beforeUpdate } from "svelte";

  beforeUpdate(() => {
    firstLoad.set(false);
  });
</script>

<Top />
<Stats />
<Toast />
