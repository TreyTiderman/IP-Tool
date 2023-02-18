<script>
    import { settings } from "../js/settings";
    import InterfaceTable from "../components/InterfaceTable.svelte";
</script>

<article
    class="mono" 
    class:fixedColumns={$settings.fixedColumns}
    class:tableGridLines={$settings.tableGridLines}
>
    <InterfaceTable/>
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
</style>
