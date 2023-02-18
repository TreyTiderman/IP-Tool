<script>
    import { settings } from "../js/settings";
    import InterfaceTableHeader from "../components/InterfaceTableHeader.svelte";
    import InterfaceTableBody from "../components/InterfaceTableBody.svelte";
</script>

<!-- Interface Table -->
<table 
    id="interface_table"
    class:fixedColumns={$settings.fixedColumns}
    class:tableGridLines={$settings.tableGridLines}
>
    <InterfaceTableHeader/>
    <InterfaceTableBody/>
</table>

<style>
    /* Setting fixedColumns */
    :global(.fixedColumns th),
    :global(.fixedColumns td) {
        min-width: 10.75rem;
    }
    
    /* Setting tableGridLines */
    :global(.tableGridLines th),
    :global(.tableGridLines td) {
        border: var(--border);
        border-color: var(--color-text-dim);
        border: none;
        box-shadow: inset 0px 0px 0px calc(var(--border-thickness)/2) var(--color-text-dim);
    }
    :global(table.tableGridLines) {
        border: var(--border);
        border-color: var(--color-text-dim);
        border: none;
        box-shadow: inset 0px 0px 0px var(--border-thickness) var(--color-text-dim);
    }
</style>