<script>
    import { ipv4 } from "../js/store_ipv4";
    import { settings } from "../js/store_settings";
    import InterfaceTable from "./InterfaceTable.svelte";
    // import PresetTable from "../components/PresetTable.svelte";

    // Debug
    // $: console.log("$ipv4", $ipv4)
    // $: console.log("$ipv4.interface_active", $ipv4.interface_active)
    // $: console.log("$ipv4", $ipv4)
    // $: console.log("$ipv4", $ipv4)
</script>

<article class="mono">
    <InterfaceTable />
</article>

<style>
    article {
        display: flex;
        flex-wrap: wrap;
        gap: var(--gap);
        justify-content: flex-start;
        margin: var(--pad);
        align-items: flex-start;
    }
</style>
