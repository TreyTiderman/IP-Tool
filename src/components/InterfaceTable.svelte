<script>
    import { get_interfaces } from "../js/tauri";
    import { settings } from "../js/settings";
    import InterfaceTableHeader from "../components/InterfaceTableHeader.svelte";
    import InterfaceTableBody from "../components/InterfaceTableBody.svelte";

    let interfaces = [];

    let interval;
    import { onDestroy, onMount } from "svelte";
    onMount(async () => {
        interfaces = await get_interfaces();
        interval = setInterval(async () => {
            interfaces = await get_interfaces();
        }, $settings.ipPollRate_ms);
    });
    onDestroy(async () => {
        interfaces = await get_interfaces();
        clearInterval(interval);
    });
</script>

<!-- Interface Table -->
<table
    id="interface_table"
    class:fixedColumns={$settings.fixedColumns}
    class:tableGridLines={$settings.tableGridLines}
>
    <InterfaceTableHeader
        on:get_interfaces={async () => {
            interfaces = await get_interfaces();
        }}
    />
    <InterfaceTableBody
        bind:interfaces
        on:get_interfaces={async () => {
            interfaces = await get_interfaces();
        }}
    />
</table>

<style>
</style>
