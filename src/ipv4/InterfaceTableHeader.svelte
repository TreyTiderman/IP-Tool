<script>
    // Components
    import ContextMenu from "../components/ContextMenu.svelte";

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

<ContextMenu
    items={contextMenuItems}
    bind:menu={contextMenu}
    on:any_click={() => contextMenu.hide()}
    on:any_contextmenu={() => contextMenu.hide()}
/>
<div class="header">
    <div class="cell"><span>Interface</span></div>
    <div class="cell"><span>IP Address(s)</span></div>
    <div class="cell"><span>Subnet Mask(s)</span></div>
    <div class="cell"><span>Gateway</span></div>
    <div class="cell"><span>DNS Server(s)</span></div>
    <button on:click={(e) => contextMenu.showAtEvent(e)}>
        <i class="fa-solid fa-ellipsis-vertical" />
    </button>
</div>

<style>
    .header {
        background-color: #002;
        display: flex;
        gap: var(--gap);
        align-items: center;
    }
    .cell {
        padding: var(--pad);
    }
</style>
