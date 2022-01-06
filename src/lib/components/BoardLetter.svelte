<script>
  export let letter = "";
  export let hint = "";
  let animate = false;

  $: {
    if (letter != "") {
      animate = true;
      setTimeout(() => {
        animate = false;
      }, 500);
    }
  }

  function classFromHint(hint) {
    switch (hint) {
      case 2:
        return "border-green-500 text-green-900 bg-green-400";
      case 1:
        return "border-yellow-500 text-yellow-900 bg-yellow-400";
      case 0:
        return "border-gray-500 text-gray-600 bg-gray-400";
      default:
        return "bg-gray-50";
    }
  }
</script>

<div
  class:animate-pop={animate}
  class:border-gray-300={letter}
  class="transition-colors border-2 m-1 h-16 w-16 text-5xl uppercase font-bold flex items-center justify-center {classFromHint(
    hint
  )}"
>
  {letter}
</div>
