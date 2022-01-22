<script>
  import { present, correct, absent } from "$lib/stores/letters.js";

  export let key;

  let classes = "";

  $: if ($correct.has(key)) {
    classes = "bg-sky-400 text-sky-700";
  } else if ($present.has(key)) {
    classes = "bg-yellow-300 text-yellow-700";
  } else if ($absent.has(key)) {
    classes = "bg-gray-500 text-gray-400";
  } else {
    classes = "bg-slate-400 text-sky-50";
  }
</script>

<button
  on:click
  class="h-14 rounded m-[2px] uppercase font-bold w-10 flex items-center justify-center {classes}"
>
  {key}
</button>
