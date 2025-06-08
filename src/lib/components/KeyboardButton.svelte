<script>
  import { present, correct, absent } from "$lib/stores/letters.js";
  import { colorBlindness } from "$lib/stores/settings.js";
  import { beforeUpdate } from "svelte";

  export let key;
  let classes = "";

  beforeUpdate(() => {
    if (key && key.length != 1) {
      window.location.reload();
    }
  });

  $: if ($correct.has(key)) {
    if ($colorBlindness) {
      classes = "bg-sky-400 text-sky-800";
    } else {
      classes = "bg-green-400 text-green-700";
    }
  } else if ($present.has(key)) {
    if ($colorBlindness) {
      classes = "bg-yellow-300 text-yellow-700";
    } else {
      classes = "bg-orange-300 text-orange-600";
    }
  } else if ($absent.has(key)) {
    classes = "bg-gray-500 text-gray-400";
  } else {
    classes = "bg-slate-400";
  }
</script>

<button
  on:click
  class="m-[2px] flex h-14 w-10 items-center justify-center rounded-sm font-bold uppercase text-white {classes}"
>
  {key}
</button>
