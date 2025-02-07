<script>
  import "../app.css";
  let { children } = $props();
  $effect(() => {
    if (window.navigator.standalone) {
      document.body.classList.add("standalone");
    }
  });
</script>

{@render children()}
