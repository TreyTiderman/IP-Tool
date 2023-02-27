<script>
    import { settings } from "../js/settings";
    import InterfaceTable from "../components/InterfaceTable.svelte";
    import PresetTable from "../components/PresetTable.svelte";
</script>

<article
    class="mono" 
    class:fixedColumns={$settings.fixedColumns}
    class:tableGridLines={$settings.tableGridLines}
    class:alternatingRowBG={$settings.alternatingRowBG}
>
    <InterfaceTable/>
    <br>
    <PresetTable/>
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

    /* Setting alternatingRowBG */
    :global(.alternatingRowBG tr:nth-child(even)) {
        background-color: var(--color-bg-section);
    }
    :global(.alternatingRowBG thead tr:nth-child(1)) {
        background-color: var(--color-bg-section);
    }

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
        box-shadow: inset 0px 0px 0px calc(var(--border-thickness) / 2)
            var(--color-border);
    }
    :global(table.tableGridLines) {
        border: var(--border);
        border-color: var(--color-text-dim);
        border: none;
        box-shadow: inset 0px 0px 0px var(--border-thickness)
            var(--color-border);
    }
</style>
