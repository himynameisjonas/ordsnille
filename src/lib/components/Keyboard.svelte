<script>
  let rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "å"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];
</script>

<div>
  {#each rows as row}
    <div class="flex justify-center">
      {#each row as key}
        <button class="h-14 rounded m-1 bg-slate-400 uppercase text-white font-bold w-10 flex items-center justify-center">
          {key}
        </button>
      {/each}
    </div>
  {/each}
</div>
