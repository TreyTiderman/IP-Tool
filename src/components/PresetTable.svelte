<script>
    import { ipv4, default_preset, default_presets } from "../js/store_ipv4";
    import { clone } from "../js/helper";
    import PresetTableHeader from "./PresetTableHeader.svelte";
    import PresetTableBody from "./PresetTableBody.svelte";

    // Event Dispatcher
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

</script>

<!-- Preset Table -->
<table id="preset_table">
    <PresetTableHeader 
        on:new={() => {
            $ipv4.presets.push(clone(default_preset));
            $ipv4.presets[$ipv4.presets.length-1].name = Date.now()
        }}
        on:reset={() => {
            $ipv4.presets = clone(default_presets);
        }}
        on:clear={() => {
            $ipv4.presets = [];
        }}
    />
    <PresetTableBody/>
</table>

<style>
</style>
