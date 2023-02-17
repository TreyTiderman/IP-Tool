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
    style="border: {$settings.hasDecorations ? 'none' : 'var(--border)'}"
>
    <Header />
    <Main />
</div>

<style>
    #app {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
</style>
