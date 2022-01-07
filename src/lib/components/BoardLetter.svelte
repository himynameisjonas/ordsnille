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
  class:border-green-600={hint == 2}
  class:text-green-600={hint == 2}
  class:bg-green-300={hint == 2}
  class:border-orange-500={hint == 1}
  class:text-orange-500={hint == 1}
  class:bg-orange-200={hint == 1}
  class:border-gray-500={hint == 0}
  class:text-gray-500={hint == 0}
  class:bg-gray-400={hint == 0}
  class:border-gray-300={letter && hint == null}
  class:text-gray-600={letter && hint == null}
  class:bg-neutral-50={!letter && hint == null}
  class="rounded transition-colors border-2 m-1 h-16 w-16 text-5xl uppercase font-bold flex items-center justify-center"
>
  {letter}
</div>
