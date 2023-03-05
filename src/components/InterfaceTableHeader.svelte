<script>
    // Components
    import UpDown from "./UpDown.svelte";
    import ContextMenu from "./ContextMenu.svelte";

    // Event Dispatcher
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // Variables
    let contextMenu;
    const contextMenuItems = [
        {
            text: "Refresh Interfaces",
            class: "fa-solid fa-arrows-rotate",
            onClick: () => dispatch("get_interfaces"),
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
            <button on:click={(e) => contextMenu.showAtEvent(e)}>
                <i class="fa-solid fa-ellipsis-vertical" />
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
        color: inherit;
        border-radius: 0;
    }
</style>
