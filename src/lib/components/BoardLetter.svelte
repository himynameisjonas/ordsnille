<script>
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

  const delays = [
    "",
    "animate__delay-1s",
    "animate__delay-2s",
    "animate__delay-3s",
    "animate__delay-4s",
    "animate__delay-5s",
  ];

  function handleClick() {
    if ($game.boardIndex !== boardIndex) return;
    game.setCursor(letterIndex);
  }

  $: displayLetter = letter === " " ? "" : letter;

  $: if (internalHint != null) {
    animate = `animate__animated animate__slideInDown animate__faster ${delays[letterIndex]}`;
  } else if (displayLetter != "") {
    animate = "animate__bounceIn animate__faster animate__animated";
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
  } else if (displayLetter && internalHint == null) {
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
    animate = "animate__headShake";
  }
</script>

<div
  class:h-16={!smallSize}
  class:w-16={!smallSize}
  class:text-5xl={!smallSize}
  class:h-11={smallSize}
  class:w-11={smallSize}
  class:text-3xl={smallSize}
  class:cursor-pointer={$game.boardIndex == boardIndex}
  class="relative m-0.5 overflow-hidden font-bold uppercase"
  on:click={handleClick}
>
  <div
    class="animate__bounceIn animate__faster animate__animated relative flex h-full w-full items-center justify-center rounded-sm border-2 bg-neutral-50 text-gray-700"
  >
    {displayLetter}
    {#if showCursor}
      <span
        class="animate__flash animate__animated animate__infinite animate__slow absolute bottom-2 left-1/2 h-1 w-7/12 -translate-x-1/2 bg-neutral-400"
      ></span>
    {/if}
  </div>

  {#if internalHint != null}
    <div
      class="absolute inset-0 flex items-center justify-center rounded-sm border-2 {classBorder} {classText} {classBg} {animate}"
    >
      {displayLetter}
    </div>
  {/if}
</div>
