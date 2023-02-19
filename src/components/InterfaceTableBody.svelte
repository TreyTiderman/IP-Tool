<script>
    import {
        set_dhcp,
        set_ip_static,
        add_ip_static,
        set_dns_static,
    } from "../js/tauri";
    import InterfaceTableRow from "./InterfaceTableRow.svelte";
    import InterfaceTableRowEdit from "./InterfaceTableRowEdit.svelte";

    // Event Dispatcher
    import { createEventDispatcher } from "svelte";
    import { settings } from "../js/settings";
    const dispatch = createEventDispatcher();

    // Variables
    let interfaceEdit = false;
    let interfaceSelected = "default_198";
    export let interfaces = [
        {
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
        },
        {
            interface_name: "WiFi",
            interface_metric: 50,
            gateway: "10.10.1.1",
            gateway_metric: 1,
            ip_is_dhcp: false,
            ip_and_masks: [
                {
                    ip_address: "10.10.1.9",
                    subnet_mask: "255.255.0.0",
                },
            ],
            dns_is_dhcp: false,
            dns_servers: ["10.10.1.1"],
        },
    ];
</script>

<tbody>
    {#each interfaces as nic}
        {#if interfaceSelected === nic.interface_name && interfaceEdit}
            <InterfaceTableRowEdit
                {nic}
                on:confirm={(edit) => {
                    interfaceEdit = false;
                    console.log("edit confimed", edit.detail);
                    for (let i = 0; i < edit.detail.ip_and_masks.length; i++) {
                        const ip_and_mask = edit.detail.ip_and_masks[i];
                        if (i === 0) {
                            set_ip_static(
                                edit.detail.interface_name,
                                ip_and_mask.ip_address,
                                ip_and_mask.subnet_mask,
                                edit.detail.gateway
                            );
                        } else {
                            add_ip_static(
                                edit.detail.interface_name,
                                ip_and_mask.ip_address,
                                ip_and_mask.subnet_mask
                            );
                        }
                    }
                    set_dns_static(
                        edit.detail.interface_name,
                        edit.detail.dns_servers[0],
                        edit.detail.dns_servers[1]
                    );
                }}
                on:cancel={() => {
                    interfaceEdit = false;
                }}
            />
        {:else}
            <InterfaceTableRow
                {nic}
                selected={interfaceSelected === nic.interface_name}
                on:edit={() => {
                    interfaceEdit = true;
                }}
                on:select={() => {
                    interfaceEdit = false;
                    interfaceSelected = nic.interface_name;
                }}
            />
        {/if}
    {/each}
</tbody>

<style>
</style>
