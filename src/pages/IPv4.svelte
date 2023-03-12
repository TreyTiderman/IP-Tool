<script>
    import { ipv4 } from "../js/store_ipv4";
    import { settings } from "../js/store_settings";
    import InterfaceTable from "../components/InterfaceTable.svelte";
    import PresetTable from "../components/PresetTable.svelte";

    // Debug
    // $: console.log("$ipv4", $ipv4)
    // $: console.log("$ipv4.interface_active", $ipv4.interface_active)
    // $: console.log("$ipv4", $ipv4)
    // $: console.log("$ipv4", $ipv4)
</script>

<article
    class="mono"
    class:fixedColumns={$settings.fixedColumns}
    class:tableGridLines={$settings.tableGridLines}
    class:colored_headers={$settings.colored_headers}
    class:alternatingRowBG={$settings.alternatingRowBG}
>
    <InterfaceTable />
    <!-- <br /> -->
    <PresetTable />
</article>

<style>
    article {
        display: flex;
        flex-wrap: wrap;
        gap: var(--gap);
        column-gap: calc(var(--gap) * 4);
        justify-content: flex-start;
        margin: var(--pad);
        align-items: flex-start;
    }
    :global(th) {
        border: none;
    }

    /* Setting alternatingRowBG */
    :global(.alternatingRowBG > table > tbody > tr:nth-child(even)) {
        background-color: var(--color-bg-section);
    }
    :global(.colored_headers table:first-child > thead > tr:nth-child(1)) {
        background-color: var(--color-bg-purple);
        color: var(--color-text-purple);
    }
    :global(.colored_headers thead tr:nth-child(1)) {
        background-color: var(--color-bg-orange);
        color: var(--color-text-orange);
    }

    /* Setting fixedColumns */
    :global(.fixedColumns th),
    :global(.fixedColumns td) {
        min-width: 10.75rem;
    }

    /* Setting tableGridLines */
    :global(.tableGridLines table) {
        border: var(--border);
    }
    :global(.tableGridLines th),
    :global(.tableGridLines td) {
        border: var(--border);
        border: none;
        box-shadow: inset 0px 0px 0px calc(var(--border-thickness) / 2) var(--color-border);
    }
</style>
