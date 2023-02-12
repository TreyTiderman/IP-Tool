<script>
    import { global } from "../js/global";

    // Components
    import IP_Presets from "../pages/IP_Presets.svelte";
    import Routes from "../pages/Routes.svelte";
    import Settings from "../pages/Settings.svelte";
</script>

<main>
    {#if $global.tabActive === $global.tabs[0]}
        <IP_Presets/>
    {:else if $global.tabActive === $global.tabs[1]}
        <Routes/>
    {:else if $global.tabActive === $global.tabs[2]}
        <Settings/>
    {/if}
</main>

<style>
    main {
        overflow: auto;
        flex-grow: 1;
    }
</style>
