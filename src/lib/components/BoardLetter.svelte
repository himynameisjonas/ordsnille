<script>
  import { colorBlindness } from "$lib/stores/settings.js";
  import game from "$lib/stores/game.js";

  export let letter = "";
  export let hint = null;
  export let boardIndex;
  export let letterIndex;
  export let smallSize = false;

  let internalHint;
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

  $: if (hint != null) {
    internalHint = hint;
  } else {
    let hints = $game.hints[boardIndex];
    if (hints) {
      internalHint = hints[letterIndex];
    } else {
      internalHint = null;
    }
  }

  $: if (internalHint == 2) {
    if ($colorBlindness) {
      classBorder = "border-sky-600";
      classText = "text-sky-600";
      classBg = "bg-sky-300";
    } else {
      classBorder = "border-green-600";
      classText = "text-green-600";
      classBg = "bg-green-300";
    }
  } else if (internalHint == 1) {
    if ($colorBlindness) {
      classBorder = "border-yellow-500";
      classText = "text-yellow-600";
      classBg = "bg-yellow-200";
    } else {
      classBorder = "border-orange-500";
      classText = "text-orange-500";
      classBg = "bg-orange-200";
    }
  } else if (internalHint == 0) {
    classBorder = "border-gray-500";
    classText = "text-gray-500";
    classBg = "bg-gray-400";
  } else if (letter && internalHint == null) {
    classBorder = "border-gray-300";
    classText = "text-gray-600";
  } else {
    classBg = "bg-neutral-50";
    classBorder = "";
    classText = "";
  }
</script>

<div
  class:animate-pop={animate}
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
