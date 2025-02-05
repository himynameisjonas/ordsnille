<script>
  import { afterUpdate } from "svelte";

  import { colorBlindness } from "$lib/stores/settings.js";
  import game, { currentIndexes } from "$lib/stores/game.js";

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
  let showCursor = false;
  let animationTimeout;

  afterUpdate(() => {
    clearTimeout(animationTimeout);
    animationTimeout = setTimeout(() => {
      animate = true;
    }, 500);
  });

  $: if (internalHint != null) {
    animate = "animate-flipInX animate-fast";
  } else if (letter != "") {
    animate = "animate-bounceIn animate-faster";
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

  $: if ($currentIndexes.board == boardIndex && $currentIndexes.letter == letterIndex) {
    showCursor = true;
    setTimeout(() => {
      showCursor = false;
    }, 2000);
  } else {
    showCursor = false;
  }
  $: if ($currentIndexes.board == boardIndex && $game.invalidWord) {
    animate = "animate-headShake";
  }
</script>

<div
  class:h-16={!smallSize}
  class:w-16={!smallSize}
  class:text-5xl={!smallSize}
  class:h-11={smallSize}
  class:w-11={smallSize}
  class:text-3xl={smallSize}
  class="{classBorder} {classText} {classBg} {animate} m-0.5 flex items-center justify-center rounded border-2 font-bold uppercase transition-colors"
>
  {#if showCursor}
    <span
      class="mb-2 mt-auto h-1 w-7/12 animate-flash bg-neutral-400 animate-slower animate-infinite"
    ></span>
  {/if}
  {letter}
</div>
