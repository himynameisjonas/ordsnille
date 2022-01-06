<script>
  export let letter = "";
  export let hint;
  let animate = false;

  $: {
    if (letter != "") {
      animate = true;
      setTimeout(() => {
        animate = false;
      }, 500);
    }
  }
</script>

<div
  class:animate-pop={animate}
  class:border-green-500={hint == 2}
  class:text-green-900={hint == 2}
  class:bg-green-400={hint == 2}
  class:border-yellow-500={hint == 1}
  class:text-yellow-900={hint == 1}
  class:bg-yellow-400={hint == 1}
  class:border-gray-500={hint == 0}
  class:text-gray-600={hint == 0}
  class:bg-gray-400={hint == 0}
  class:border-gray-300={letter && !hint}
  class="transition-colors border-2 m-1 h-16 w-16 text-5xl uppercase font-bold flex items-center justify-center"
>
  {letter}
</div>
