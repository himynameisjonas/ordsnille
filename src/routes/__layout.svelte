<script>
  import "../app.css";
  $: if (window.navigator.standalone) {
    document.body.classList.add("standalone");
  }
</script>

<slot />
