<script>
    import { state } from "../js/store_state";

    // Components
    import IPv4 from "../ipv4/IPv4.svelte";
    import Routes from "../pages/Routes.svelte";
    import Settings from "../pages/Settings.svelte";
</script>

<main>
    {#if $state.nav_tab_active === "IPv4"}
        <IPv4/>
    {:else if $state.nav_tab_active === $state.nav_tabs[1]}
        <Routes/>
    {:else if $state.nav_tab_active === $state.nav_tabs[2]}
        <Settings/>
    {/if}
</main>

<style>
    main {
        overflow: auto;
        flex-grow: 1;
    }
</style>
