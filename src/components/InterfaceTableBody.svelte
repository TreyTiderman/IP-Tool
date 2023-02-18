<script>
    import { invoke } from "@tauri-apps/api/tauri";
    import InterfaceTableRow from "./InterfaceTableRow.svelte";
    import InterfaceTableRowEdit from "./InterfaceTableRowEdit.svelte";

    // Variables
    let interfaceEdit = false;
    let interfaceSelected = "default_198";
    let interfaces = [
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
