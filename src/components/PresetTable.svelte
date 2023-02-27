<script>
    import { settings } from "../js/settings";
    import PresetTableHeader from "./PresetTableHeader.svelte";
    import PresetTableBody from "./PresetTableBody.svelte";

    const default_preset = {
        name: "edit me",
        gateway: "192.168.1.1",
        ip_is_dhcp: false,
        ip_and_masks: [
            {
                ip_address: "192.168.1.7",
                subnet_mask: "255.255.255.0",
            },
        ],
        dns_is_dhcp: false,
        dns_servers: ["1.1.1.1"],
    }
    const default_presets = [
        {
            name: "Automatic",
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
        {
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
        },
        {
            name: "default_2",
            gateway: "192.168.2.1",
            ip_is_dhcp: false,
            ip_and_masks: [
                {
                    ip_address: "192.168.2.7",
                    subnet_mask: "255.255.255.0",
                },
            ],
            dns_is_dhcp: false,
            dns_servers: ["192.168.2.1"],
        },
        {
            name: "default_3",
            gateway: "192.168.3.1",
            ip_is_dhcp: false,
            ip_and_masks: [
                {
                    ip_address: "192.168.3.7",
                    subnet_mask: "255.255.255.0",
                },
            ],
            dns_is_dhcp: false,
            dns_servers: ["192.168.3.1"],
        },
        {
            name: "default_4",
            gateway: "192.168.4.1",
            ip_is_dhcp: false,
            ip_and_masks: [
                {
                    ip_address: "192.168.4.7",
                    subnet_mask: "255.255.255.0",
                },
            ],
            dns_is_dhcp: false,
            dns_servers: ["192.168.4.1"],
        },
        {
            name: "default_10",
            gateway: "10.0.0.1",
            ip_is_dhcp: false,
            ip_and_masks: [
                {
                    ip_address: "10.0.0.7",
                    subnet_mask: "255.0.0.0",
                },
            ],
            dns_is_dhcp: false,
            dns_servers: ["10.0.0.1"],
        },
        {
            name: "default_169",
            gateway: "169.254.0.1",
            ip_is_dhcp: false,
            ip_and_masks: [
                {
                    ip_address: "169.254.0.9",
                    subnet_mask: "255.255.0.0",
                },
            ],
            dns_is_dhcp: false,
            dns_servers: ["169.254.0.1"],
        },
        {
            name: "default_172",
            gateway: "172.22.0.2",
            ip_is_dhcp: false,
            ip_and_masks: [
                {
                    ip_address: "172.22.0.9",
                    subnet_mask: "255.255.0.0",
                },
            ],
            dns_is_dhcp: false,
            dns_servers: ["172.22.0.2"],
        },
        {
            name: "default_198",
            gateway: "198.18.0.1",
            ip_is_dhcp: false,
            ip_and_masks: [
                {
                    ip_address: "198.18.0.9",
                    subnet_mask: "255.255.0.0",
                },
            ],
            dns_is_dhcp: false,
            dns_servers: ["198.18.0.1"],
        },
        {
            name: "default_all",
            gateway: "192.168.1.1",
            ip_is_dhcp: false,
            ip_and_masks: [
                {
                    ip_address: "169.254.0.9",
                    subnet_mask: "255.255.0.0",
                },
                {
                    ip_address: "172.22.0.9",
                    subnet_mask: "255.255.0.0",
                },
                {
                    ip_address: "192.168.0.9",
                    subnet_mask: "255.255.0.0",
                },
            ],
            dns_is_dhcp: false,
            dns_servers: ["8.8.8.8", "8.8.4.4"],
        },
    ];
    let presets = [];
    
    // Get presets from localStorage
    let presetsLocalStorage = localStorage.getItem("presets");
    if (presetsLocalStorage === null || presetsLocalStorage === undefined || presetsLocalStorage === "") {
        presetsLocalStorage = default_presets
        console.log("NO stored presets. Setting to default", default_presets);
        presets = default_presets;
        localStorage.setItem("presets", JSON.stringify(presets));
    }
    else {
        const presetsLocalStorageParsed = JSON.parse(presetsLocalStorage);
        console.log("Stored presets", presetsLocalStorageParsed);
        presets = presetsLocalStorageParsed;
    }

</script>

<!-- Preset Table -->
<table
    id="preset_table"
    class:fixedColumns={$settings.fixedColumns}
    class:tableGridLines={$settings.tableGridLines}
>
    <PresetTableHeader 
        on:new={async () => {
            presets.push(default_preset);
            presets = presets;
        }}
        on:reset={async () => {
            localStorage.setItem("presets", JSON.stringify(default_presets));
            presets = default_presets;
        }}
        on:clear={async () => {
            localStorage.setItem("presets", "[]");
            presets = [];
        }}
    />
    <PresetTableBody
        bind:presets
        
    />

</table>

<style>
</style>
