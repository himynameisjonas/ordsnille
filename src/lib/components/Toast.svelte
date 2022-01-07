<script>
  import { flip } from "svelte/animate";
  import { fly } from "svelte/transition";
  import { notifications } from "$lib/stores/notifications.js";

  export let themes = {
    success: "bg-green-500 border-2 border-green-600",
    warning: "bg-orange-500 border-2 border-orange-600",
  };
</script>

<div
  class="fixed inset-0 z-50 top-20 pointer-events-none m-auto flex flex-col items-center justify-start"
>
  {#each $notifications as notification (notification.id)}
    <div
      animate:flip
      class="drop-shadow-xl rounded flex mb-2 {themes[notification.type]}"
      transition:fly={{ y: 30 }}
    >
      <div class="p-2 font-bold text-white">{notification.message}</div>
    </div>
  {/each}
</div>
