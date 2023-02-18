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
            onClick: () => {},
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
        <th><span>Interface</span></th>
        <th><span>IP Address(s)</span></th>
        <th><span>Subnet Mask(s)</span></th>
        <th><span>Gateway</span></th>
        <th><span>DNS Server(s)</span></th>
        <th>
            <button on:click={e => contextMenu.showAtEvent(e)}>
                <i class="fa-solid fa-ellipsis-vertical"/>
            </button>
        </th>
    </tr>
</thead>

<style>
    th {
        min-width: fit-content;
        padding: 0;
    }
    span {
        padding: 0 var(--pad);
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