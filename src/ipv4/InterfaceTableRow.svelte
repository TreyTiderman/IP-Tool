<script>
    import { set_dhcp, set_preset } from "../js/tauri";
    import { ipv4 } from "../js/store_ipv4";
    import ContextMenu from "../components/ContextMenu.svelte";

    // Event Dispatcher
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let selected = true;
    export let nic = {
        interface_name: "Ethernet",
        interface_metric: 25,
        gateway: "192.168.1.254",
        gateway_metric: 1,
        ip_is_dhcp: false,
        ip_and_masks: [
            {
                ip_address: "192.168.1.9",
                subnet_mask: "255.255.255.0",
            },
            {
                ip_address: "192.168.3.9",
                subnet_mask: "255.255.255.0",
            },
            {
                ip_address: "192.168.4.9",
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
            text: "Set DHCP",
            class: "fa-solid fa-wand-magic-sparkles",
            onClick: () => set_dhcp(nic.interface_name),
        },
        {
            text: "Set Preset Selected",
            class: "fa-solid fa-check",
            onClick: () => set_preset($ipv4.interface_active.interface_name, $ipv4.preset_active),
        },
    ];
</script>

<ContextMenu
    bind:menu={contextMenu}
    items={contextMenuItems}
    on:any_click={() => contextMenu.hide()}
    on:any_contextmenu={() => contextMenu.hide()}
/>
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
    class="row"
    class:selected
    on:click={() => dispatch("select")}
    on:contextmenu|preventDefault={(event) => {
        dispatch("select");
        contextMenu.showAtEvent(event);
    }}
>
    <td>
        <div>
            <span>{nic.interface_name} {nic.ip_is_dhcp ? "(DHCP)" : ""}</span>
        </div>
    </td>
    <td>
        <div>
            {#each nic.ip_and_masks as ip_and_mask}
                <span>{ip_and_mask.ip_address}</span>
            {/each}
        </div>
    </td>
    <td>
        <div>
            {#each nic.ip_and_masks as ip_and_mask}
                <span>{ip_and_mask.subnet_mask}</span>
            {/each}
        </div>
    </td>
    <td>
        <div>
            <span>{nic.gateway || "-"}</span>
        </div>
    </td>
    <td>
        <div>
            {#each nic.dns_servers as dns_server}
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
</div>

<style>
    
</style>
