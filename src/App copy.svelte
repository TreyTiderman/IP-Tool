<script>

  // Imports
  import { enable, isEnabled, disable } from "tauri-plugin-autostart-api";
  import { unregisterAll, register } from '@tauri-apps/api/globalShortcut';
  import { Command } from '@tauri-apps/api/shell';
  import { invoke } from "@tauri-apps/api/tauri"

  import { appWindow } from '@tauri-apps/api/window';

  // Components
  import Network from "./pages/Network.svelte";

  // Variables
  let title = "IP Tool";
  let response = "";
  let isAlwaysOnTop = true;
  let isAutoStart = false;
  let shortcut = ""

  // Functions
  function toggleTheme() {
    const html = document.documentElement
    if (html.classList[0] === "dark") html.classList = "light"
    else html.classList = "dark"
  }
  function toggleAlwaysOnTop() {
    isAlwaysOnTop = !isAlwaysOnTop;
    appWindow.setAlwaysOnTop(isAlwaysOnTop);
  }

  // Startup
  import { onMount } from "svelte";
  onMount(async () => {
    
    // Hide Title bar, don't hide in the Tauri config so they show unless this page loads correctly
    appWindow.setDecorations(false);

    // Set Always On Top
    appWindow.setAlwaysOnTop(isAlwaysOnTop);
    appWindow.show();
    
    isAutoStart = await isEnabled()

  })


</script>

<header data-tauri-drag-region>
  <h3 style="padding-left: var(--pad);">{title}</h3>
  <button class="right" on:click={toggleAlwaysOnTop} style="color: {isAlwaysOnTop ? "" : "var(--color-text-dim)"}">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentcolor"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M32 32C32 14.3 46.3 0 64 0H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H290.5l11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3H32c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64H64C46.3 64 32 49.7 32 32zM160 384h64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z"/></svg>  </button>
  <button on:click={() => appWindow.minimize()}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentcolor"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"/></svg>
  </button>
  <button on:click={() => appWindow.toggleMaximize()}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentcolor"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M384 32C419.3 32 448 60.65 448 96V416C448 451.3 419.3 480 384 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H384zM384 80H64C55.16 80 48 87.16 48 96V416C48 424.8 55.16 432 64 432H384C392.8 432 400 424.8 400 416V96C400 87.16 392.8 80 384 80z"/></svg>
  </button>
  <button on:click={() => appWindow.close()}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentcolor"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
  </button>
</header>
<main class="grid">
  <div class="flex">
    <button class="mono" on:click={async () => {
        let output = await invoke("get_interfaces");
        console.log(JSON.parse(output));
    }}>
      get_interfaces
    </button>
    <Network/>
  </div>
  <p>{response}</p>
</main>

<style>
  :global(body) {
		border: var(--border);
	}
  header {
    display: flex;
    align-items: center;
    background-color: var(--color-bg-header);
    border-bottom: var(--border);
  }
  header button {
    border-radius: 0;
    background-color: var(--color-bg-header);
    padding: var(--pad);
    display: grid;
    place-items: center;
  }
  main {
    padding: var(--pad);
  }
  svg {
    display: inline;
    width: 1em;
    height: 1em;
  }
  .right {
    margin-left: auto;
  }
</style>
