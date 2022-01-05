<script>
  export let letter = "";
  export let hint = "";

  function classFromHint(hint) {
    switch (hint) {
      case 2:
        return "text-green-900 bg-green-400";
      case 1:
        return "text-yellow-900 bg-yellow-400";
      case 0:
        return "text-gray-600 bg-gray-400";
      default:
        break;
    }
  }
</script>

<div
  class="bg-gray-50 border-2 m-2 h-20 w-20 text-5xl uppercase font-bold flex items-center justify-center {classFromHint(
    hint
  )}"
>
  {letter}
</div>
