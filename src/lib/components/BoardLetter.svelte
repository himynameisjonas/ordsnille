<script>
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
    classBorder = "border-sky-600 dark:border-sky-700";
    classText = "text-sky-600 dark:text-sky-600";
    classBg = "bg-sky-300 dark:bg-sky-800";
  } else if (internalHint == 1) {
    classBorder = "border-yellow-500 dark:border-yellow-600";
    classText = "text-yellow-600 dark:text-yellow-600";
    classBg = "bg-yellow-200 dark:bg-yellow-700";
  } else if (internalHint == 0) {
    classBorder = "border-gray-500 dark:border-gray-500 ";
    classText = "text-gray-500";
    classBg = "bg-gray-400 dark:bg-gray-800";
  } else if (letter && internalHint == null) {
    classBorder = "border-gray-300";
    classText = "text-gray-600";
  } else {
    classBg = "bg-neutral-50 dark:bg-slate-800";
    classBorder = "dark:border-slate-700";
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
