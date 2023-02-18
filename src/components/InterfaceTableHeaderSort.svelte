<script>
    // Components
    import UpDown from "./UpDown.svelte";
    import ContextMenu from "./ContextMenu.svelte";

    // Variables
    let contextMenu;
    const table_state = {
        interface: "NONE",
        ip_addresses: "NONE",
        subnet_masks: "NONE",
        gateway: "NONE",
        dns_servers: "NONE",
    };
    const contextMenuItems = [
        {
            text: "Refresh Interfaces",
            class: "fa-solid fa-arrows-rotate",
            onClick: () => {
                
            },
        },
    ];
</script>

<thead>
    <ContextMenu
        items={contextMenuItems}
        bind:menu={contextMenu}
        on:any_click={() => contextMenu.hide()}
        on:any_contextmenu={() => contextMenu.hide()}
    />
    <tr>
        <th>
            <UpDown
                text="Interface"
                bind:state={table_state.interface}
            />
        </th>
        <th>
            <UpDown
                text="IP Address(s)"
                bind:state={table_state.ip_addresses}
            />
        </th>
        <th>
            <UpDown
                text="Subnet Mask(s)"
                bind:state={table_state.subnet_masks}
            />
        </th>
        <th>
            <UpDown
                text="Gateway"
                bind:state={table_state.gateway}
            />
        </th>
        <th>
            <UpDown
                text="DNS Server(s)"
                bind:state={table_state.dns_servers}
            />
        </th>
        <th>
            <button on:click={e => contextMenu.showAtEvent(e)}>
                <i class="fa-solid fa-ellipsis-vertical"/>
            </button>
        </th>
    </tr>
</thead>

<style>
    th {
        padding: calc(var(--pad) / 2) 0;
        padding: 0;
    }
    th {
        min-width: fit-content;
    }
    th:last-child {
        min-width: 2rem;
    }
    button {
        padding: var(--pad);
        background-color: transparent;
        border-radius: 0;
    }
</style>