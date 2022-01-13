<script>
  import { colorBlindness } from "$lib/stores/settings.js";

  export let letter = "";
  export let hint;
  export let smallSize = false;

  let animate = false;
  let classBorder = "";
  let classText = "";
  let classBg = "";

  $: {
    if (letter != "") {
      animate = true;
      setTimeout(() => {
        animate = false;
      }, 500);
    }
  }

  $: if (hint == 2) {
    if ($colorBlindness) {
      classBorder = "border-sky-600";
      classText = "text-sky-600";
      classBg = "bg-sky-300";
    } else {
      classBorder = "border-green-600";
      classText = "text-green-600";
      classBg = "bg-green-300";
    }
  } else if (hint == 1) {
    if ($colorBlindness) {
      classBorder = "border-yellow-500";
      classText = "text-yellow-600";
      classBg = "bg-yellow-200";
    } else {
      classBorder = "border-orange-500";
      classText = "text-orange-500";
      classBg = "bg-orange-200";
    }
  } else if (hint == 0) {
    classBorder = "border-gray-500";
    classText = "text-gray-500";
    classBg = "bg-gray-400";
  } else if (letter && hint == null) {
    classBorder = "border-gray-300";
    classText = "text-gray-600";
  } else {
    classBg = "bg-neutral-50";
  }
</script>

<div
  class:h-16={!smallSize}
  class:w-16={!smallSize}
  class:text-5xl={!smallSize}
  class:h-11={smallSize}
  class:w-11={smallSize}
  class:text-3xl={smallSize}
  class="{classBorder} {classText} {classBg} rounded transition-colors border-2 m-0.5 uppercase font-bold flex items-center justify-center"
>
  {letter}
</div>
