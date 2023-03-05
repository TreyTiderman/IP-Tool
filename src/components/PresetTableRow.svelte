<script>
    import { set_dhcp, set_preset } from "../js/tauri";
    import { ipv4 } from "../js/store_ipv4";
    import ContextMenu from "./ContextMenu.svelte";

    // Event Dispatcher
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let selected = true;
    export let preset = {
        name: "default_1",
        gateway: "192.168.1.1",
        ip_is_dhcp: false,
        ip_and_masks: [
            {
                ip_address: "192.168.1.7",
                subnet_mask: "255.255.255.0",
            },
        ],
        dns_is_dhcp: false,
        dns_servers: ["192.168.1.1"],
    };

    let contextMenu;
    const contextMenuItems = [
        {
            text: "Edit",
            class: "fa-solid fa-pen-to-square",
            onClick: () => dispatch("edit"),
        },
        {
            text: "hr",
        },
        {
            text: "Set Selected Inteface",
            class: "fa-solid fa-check",
            onClick: () => set_preset($ipv4.interface_active.interface_name, $ipv4.preset_active),
        },
        {
            text: "hr",
        },
        {
            text: "Delete Preset",
            class: "fa-solid fa-trash",
            onClick: () => dispatch("delete"),
        },
    ];
</script>

<ContextMenu
    bind:menu={contextMenu}
    items={contextMenuItems}
    on:any_click={() => contextMenu.hide()}
    on:any_contextmenu={() => contextMenu.hide()}
/>
<tr
    class:selected
    on:click={() => dispatch("select")}
    on:contextmenu|preventDefault={(event) => {
        dispatch("select");
        contextMenu.showAtEvent(event);
    }}
>
    <td>
        <div>
            <span>{preset.name} {preset.ip_is_dhcp ? "(DHCP)" : ""}</span>
        </div>
    </td>
    <td>
        <div>
            {#each preset.ip_and_masks as ip_and_mask}
                <span>{ip_and_mask.ip_address}</span>
            {/each}
        </div>
    </td>
    <td>
        <div>
            {#each preset.ip_and_masks as ip_and_mask}
                <span>{ip_and_mask.subnet_mask}</span>
            {/each}
        </div>
    </td>
    <td>
        <div>
            <span>{preset.gateway || "-"}</span>
        </div>
    </td>
    <td>
        <div>
            {#each preset.dns_servers as dns_server}
                <span>{dns_server}</span>
            {/each}
        </div>
    </td>
    <td>
        <div>
            <button on:click={(event) => contextMenu.showAtEvent(event)}>
                <i class="fa-solid fa-ellipsis-vertical" />
            </button>
        </div>
    </td>
</tr>

<style>
    td {
        padding: 0;
        vertical-align: top;
    }
    td {
        min-width: fit-content;
    }

    td:last-child {
        min-width: 2rem;
    }
    td > div {
        display: grid;
        gap: 0;
    }
    td:last-child > div {
        padding: 0;
        gap: 0;
    }

    td > div > span {
        padding: var(--pad);
    }

    tr.selected {
        /* background-color: var(--color-text-orange); */
        /* color: var(--color-bg-orange); */
        box-shadow: inset 0px 0px 0px var(--border-thickness) var(--color-bg-orange);
    }
    /* tr.selected > td:first-child > div > span {
        padding: calc(var(--pad)/2) calc(3*var(--pad)/4);
        margin: calc(var(--pad)/2) calc(var(--pad)/4);
        width: fit-content;
        border-radius: var(--radius-lg);

        background-color: var(--color-bg-orange);
        color: var(--color-text-orange);
    } */

    button {
        padding: var(--pad);
        background-color: transparent;
        color: inherit;
        border-radius: 0;
    }
</style>
