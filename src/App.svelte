<script>
    // Imports
    import { global } from "./js/global";
    import { settings } from "./js/settings";

    // Components
    import Header from "./layout/Header.svelte";
    import Main from "./layout/Main.svelte";

    // Debug
    $: console.log("global", $global);
</script>

<div
    id="app"
    style="
        border: {$settings.hasDecorations ? 'none' : 'var(--border)'};
        border-color: {$global.isAdministrator ? ' ' : 'var(--color-bg-red)'};
    "
>
    <Header />
    <div hidden={$global.isAdministrator}>
        <i class="fa-solid fa-circle-exclamation" />
        Run as Administrator in order to change settings
    </div>
    <Main />
</div>

<style>
    #app {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    #app > div {
        background-color: var(--color-bg-red);
        color: var(--color-text-red);
        padding: var(--pad);
        margin: var(--pad);
    }
</style>
