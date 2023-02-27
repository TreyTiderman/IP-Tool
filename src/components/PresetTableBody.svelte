<script>
    import {
        set_dhcp,
        set_ip_static,
        add_ip_static,
        set_dns_static,
    } from "../js/tauri";
    import { settings } from "../js/settings";
    import PresetTableRow from "./PresetTableRow.svelte";
    import PresetTableRowEdit from "./PresetTableRowEdit.svelte";

    // Event Dispatcher
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    // Variables
    let presetEdit = false;
    let presetSelected = "default_198";
    export let presets = [
        {
            name: "DHCP",
            gateway: "-",
            ip_is_dhcp: true,
            ip_and_masks: [
                {
                    ip_address: "-",
                    subnet_mask: "-",
                },
            ],
            dns_is_dhcp: true,
            dns_servers: ["-"],
        },
        {
            name: "default_0",
            gateway: "192.168.0.1",
            ip_is_dhcp: false,
            ip_and_masks: [
                {
                    ip_address: "192.168.0.7",
                    subnet_mask: "255.255.255.0",
                },
            ],
            dns_is_dhcp: false,
            dns_servers: ["192.168.0.1"],
        },
    ];
</script>

<tbody>
    {#each presets as preset}
        {#if presetSelected === preset.name && presetEdit}
            <PresetTableRowEdit
                {preset}
                on:confirm={(edit) => {
                    presetEdit = false;
                    console.log("edit confimed", edit.detail);
                    for (let i = 0; i < edit.detail.ip_and_masks.length; i++) {
                        const ip_and_mask = edit.detail.ip_and_masks[i];
                        if (i === 0) {
                            set_ip_static(
                                edit.detail.name,
                                ip_and_mask.ip_address,
                                ip_and_mask.subnet_mask,
                                edit.detail.gateway
                            );
                        } else {
                            add_ip_static(
                                edit.detail.name,
                                ip_and_mask.ip_address,
                                ip_and_mask.subnet_mask
                            );
                        }
                    }
                    set_dns_static(
                        edit.detail.name,
                        edit.detail.dns_servers[0],
                        edit.detail.dns_servers[1]
                    );
                }}
                on:cancel={() => {
                    presetEdit = false;
                }}
            />
        {:else}
            <PresetTableRow
                {preset}
                selected={presetSelected === preset.name}
                on:edit={() => {
                    presetEdit = true;
                }}
                on:select={() => {
                    presetEdit = false;
                    presetSelected = preset.name;
                }}
            />
        {/if}
    {/each}
</tbody>

<style>
</style>
