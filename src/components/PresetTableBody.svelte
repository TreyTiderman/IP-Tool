<script>
    import {
        set_dhcp,
        set_ip_static,
        add_ip_static,
        set_dns_static,
    } from "../js/tauri";
    import { ipv4 } from "../js/store_ipv4";
    import PresetTableRow from "./PresetTableRow.svelte";
    import PresetTableRowEdit from "./PresetTableRowEdit.svelte";

    // Event Dispatcher
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();
</script>

<tbody>
    {#each $ipv4.presets as preset}
        {#if $ipv4.preset_active.name === preset.name && $ipv4.preset_editing}
            <PresetTableRowEdit
                {preset}
                on:confirm={(edit) => {
                    $ipv4.preset_editing = false;
                    console.log("edit confimed", edit.detail);
                    preset = edit.detail
                    $ipv4.preset_active = edit.detail
                }}
                on:cancel={() => {
                    $ipv4.preset_editing = false;
                }}
            />
        {:else}
            <PresetTableRow
                {preset}
                selected={$ipv4.preset_active.name === preset.name}
                on:edit={() => {
                    $ipv4.preset_editing = true;
                }}
                on:select={() => {
                    $ipv4.preset_editing = false;
                    $ipv4.preset_active = preset;
                }}
                on:delete={() => {
                    $ipv4.presets = $ipv4.presets.filter(p => p.name !== preset.name);
                }}
            />
        {/if}
    {/each}
</tbody>

<style>
</style>
