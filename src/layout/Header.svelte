<script>
    // Imports
    import { state } from "../js/store_state";
    import { settings } from "../js/store_settings";
    import { appWindow } from "@tauri-apps/api/window";

    // Variables

    // Functions
    function toggleAlwaysOnTop() {
        $settings.isAlwaysOnTop = !$settings.isAlwaysOnTop;
    }
    function tabChange(tab) {
        $state.nav_tab_active = tab;
    }
</script>

<header>
    {#each $state.nav_tabs as tab}
        <button
            class="tab"
            class:tab_active={tab === $state.nav_tab_active}
            on:click={() => tabChange(tab)}
        >
            {tab}
        </button>
    {/each}
    <div class="spacing" data-tauri-drag-region />
    <button
        on:click={toggleAlwaysOnTop}
        style="color: {$settings.isAlwaysOnTop ? '' : 'var(--color-text-dim)'}"
    >
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
            fill="currentcolor"
            style="font-size: .86rem;"
            ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                d="M32 32C32 14.3 46.3 0 64 0H320c17.7 0 32 14.3 32 32s-14.3 32-32 32H290.5l11.4 148.2c36.7 19.9 65.7 53.2 79.5 94.7l1 3c3.3 9.8 1.6 20.5-4.4 28.8s-15.7 13.3-26 13.3H32c-10.3 0-19.9-4.9-26-13.3s-7.7-19.1-4.4-28.8l1-3c13.8-41.5 42.8-74.8 79.5-94.7L93.5 64H64C46.3 64 32 49.7 32 32zM160 384h64v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V384z"
            />
        </svg>
    </button>
    {#if !$settings.windowDecorations}
        <button on:click={() => appWindow.minimize()}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="currentcolor"
                ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                    d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
                />
            </svg>
        </button>
        <button on:click={() => appWindow.toggleMaximize()}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                fill="currentcolor"
                style="font-size: smaller;"
                ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                    d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z"
                />
            </svg>
        </button>
        <button on:click={() => appWindow.close()}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                fill="currentcolor"
                ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                    d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
                />
            </svg>
        </button>
    {/if}
</header>

<style>
    header {
        display: flex;
        align-items: center;
        border-bottom: var(--border);
    }
    header > * {
        height: 2rem;
        background-color: var(--color-bg-header);
        background-color: transparent;
        /* border-bottom: var(--border); */
    }
    header button {
        border-radius: 0;
        display: grid;
        place-items: center;
        padding: 0 var(--pad);
    }
    .tab {
        padding: 0 5%;
        color: var(--color-text);
        border-right: var(--border);
        border-color: var(--color-bg-input);
        /* background-color: var(--color-bg-header); */
    }
    .tab_active {
        color: var(--color-text-bright);
        background-color: var(--color-bg-input);
        background-color: var(--color-bg-header);
    }
    svg {
        display: inline;
        width: 1em;
        height: 1em;
    }
    .spacing {
        flex-grow: 1;
    }
</style>
