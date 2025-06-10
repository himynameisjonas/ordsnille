<script>
  import "../app.css";
  import { onMount } from "svelte";
  let { children } = $props();

  let showReload = $state(false);
  let currentVersion;

  async function checkVersion() {
    try {
      const res = await fetch("/version.json", { cache: "no-store" });
      if (!res.ok) return;
      const { version } = await res.json();
      if (currentVersion && version !== currentVersion) {
        showReload = true;
      }
      currentVersion = version;
    } catch (_) {
      // ignore fetch errors
    }
  }

  onMount(() => {
    checkVersion();
    const interval = setInterval(checkVersion, 300000);
    if (window.navigator.standalone) {
      document.body.classList.add("standalone");
    }
    return () => clearInterval(interval);
  });
</script>

{#if showReload}
  <div class="fixed top-[33.3vh] right-0 left-0 z-50 flex justify-center">
    <div
      class="mx-4 flex flex-wrap items-center justify-center gap-4 space-x-4 rounded border border-green-400 bg-green-100 p-6 shadow-lg"
    >
      <span class="font-medium text-green-800">En ny version finns tillgänglig</span>
      <button
        class="flex rounded-sm bg-green-500 p-2 px-4 font-bold text-white shadow-md shadow-green-500/50"
        onclick={() => location.reload()}
      >
        Ladda om spelet
      </button>
    </div>
  </div>
{/if}

{@render children()}
