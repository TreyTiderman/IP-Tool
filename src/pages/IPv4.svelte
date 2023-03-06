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
    <PresetTable />
</article>

<style>
    article {
        display: flex;
        flex-wrap: wrap;
        gap: var(--gap);
        column-gap: calc(var(--gap) * 1);
        justify-content: flex-start;
        margin: var(--pad);
        align-items: flex-start;
    }

    /* Setting alternatingRowBG */
    :global(.alternatingRowBG > table > tbody > tr:nth-child(even)) {
        background-color: var(--color-bg-section);
    }

    /* Setting colored_headers */
    :global(.colored_headers table:nth-child(1) > thead > tr) {
        background-color: var(--color-bg-purple);
        color: var(--color-text-purple);
    }
    :global(.colored_headers table:nth-child(2) > thead > tr) {
        background-color: var(--color-bg-orange);
        color: var(--color-text-orange);
    }
    :global(.colored_headers tr.selected) {
        outline: var(--border);
        outline-color: var(--color-bg-purple);
        outline-style: dashed;
        outline-offset: calc(var(--border-thickness) * -1);
    }
    :global(.colored_headers table:nth-child(1) > thead > tr > th) {
        border: none;
        outline: var(--border);
        outline-color: var(--color-bg-purple);
        outline-offset: calc(var(--border-thickness) * -1);
    }
    :global(.colored_headers table:nth-child(2) > thead > tr > th) {
        border: none;
        outline: var(--border);
        outline-color: var(--color-bg-orange);
        outline-offset: calc(var(--border-thickness) * -1);
    }
    /* :global(.colored_headers th) {
        border: none;
        outline: var(--border);
        outline-color: var(--color-bg-purple);
        outline-offset: calc(var(--border-thickness) * -1);
    }
    :global(.colored_headers tr:nth-child(1) th) {
        border: none;
        outline: var(--border);
        outline-color: var(--color-bg-orange);
        outline-offset: calc(var(--border-thickness) * -1);
    } */

    /* Setting fixedColumns */
    :global(.fixedColumns th),
    :global(.fixedColumns td) {
        min-width: 10.75rem;
        max-width: 10.75rem;
        overflow: auto;
    }
    :global(.fixedColumns td::-webkit-scrollbar) {
        display: none;
    }

    /* Setting tableGridLines */
    :global(.tableGridLines th),
    :global(.tableGridLines td) {
        border: var(--border);
        /* border: none; */
        /* box-shadow: inset 0px 0px 0px calc(var(--border-thickness) / 2) var(--color-border); */
    }
    :global(.tableGridLines td nav) {
        border: none;
    }
</style>
