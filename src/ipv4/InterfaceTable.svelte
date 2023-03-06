<script>
    import { get_interfaces, set_preset } from "../js/tauri"
    import { ipv4 } from "../js/store_ipv4"
    import { settings } from "../js/store_settings"
    import InterfaceTableHeader from "./InterfaceTableHeader.svelte"
    import InterfaceTableRow from "./InterfaceTableRow.svelte"
    import InterfaceTableEdit from "./InterfaceTableEdit.svelte"

    // Functions
    async function poll_interfaces() {
        const interfaces = await get_interfaces()
        if (JSON.stringify($ipv4.interfaces) !== JSON.stringify(interfaces)) {
            $ipv4.interfaces = interfaces
        }
    }

    // Startup
    let interval
    import { onDestroy, onMount } from "svelte"
    onMount(async () => {
        // Initial
        await poll_interfaces()
        $ipv4.interface_active = $ipv4.interfaces[0]

        // Poll
        interval = setInterval(async () => {
            await poll_interfaces()
        }, $settings.ipPollRate_ms)
    })
    onDestroy(async () => {
        clearInterval(interval)
    })
</script>

<div class="table">
    <InterfaceTableHeader
        on:get_interfaces={async () => {
            await poll_interfaces()
        }}
    />
    <div class="body">
        {#each $ipv4.interfaces as nic}
            {#if $ipv4.interface_active.interface_name === nic.interface_name && $ipv4.interface_editing}
                <InterfaceTableEdit
                    {nic}
                    on:confirm={(edit) => {
                        $ipv4.interface_editing = false
                        console.log("edit confimed", edit.detail)
                        set_preset(nic.interface_name, edit.detail)
                    }}
                    on:cancel={() => {
                        $ipv4.interface_editing = false
                    }}
                />
            {:else}
                <InterfaceTableRow
                    {nic}
                    selected={$ipv4.interface_active.interface_name === nic.interface_name}
                    on:edit={() => {
                        $ipv4.interface_editing = true
                    }}
                    on:select={() => {
                        $ipv4.interface_editing = false
                        $ipv4.interface_active = nic
                    }}
                />
            {/if}
        {/each}
    </div>
</div>

<style>
    .table {
        background-color: #200;
        display: grid;
        align-content: flex-start;
    }
    .body {
        background-color: #020;
    }
</style>
