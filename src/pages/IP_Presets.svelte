<script>
    import { invoke } from "@tauri-apps/api/tauri";
    import { settings } from "../js/settings";
    import ContextMenu from "../components/ContextMenu.svelte";
    import UpDown from "../components/UpDown.svelte";

    // Variables
    let nics = [
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
    ];
    let presetSelected = "default_198";
    let presetSelectedEdit = false;
    let presets = [
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
    
    const interface_table_state = {
        interface: "NONE",
        ip_addresses: "NONE",
        subnet_masks: "NONE",
        gateway: "NONE",
        dns_servers: "NONE",
    };

    import { onMount } from "svelte";
    onMount(async () => {
        const output = await invoke("get_interfaces");
        
        nics = [];
        const nicsTemp = JSON.parse(output);
        nicsTemp.forEach((nic) => {
            if (
                nic.ip_and_masks[0]?.ip_address &&
                nic.ip_and_masks[0]?.ip_address !== "127.0.0.1"
            ) {
                nic.dns_servers = [nic.dns_server_1, nic.dns_server_2];
                nics.push(nic);
                nics = nics;
            }
        });
        console.log("nics", nics);
    });
    $: console.log(interface_table_state);
</script>

<article class="mono" class:fixed_columns={$settings.fixedColumns}>
    <!-- Interface Table -->
    <table id="interface_table">
        <thead>
            <tr>
                <th>
                    <UpDown text="Interface" bind:state={interface_table_state.interface}/>
                </th>
                <th>
                    <UpDown text="IP Address(s)" bind:state={interface_table_state.ip_addresses}/>
                </th>
                <th>
                    <UpDown text="Subnet Mask(s)" bind:state={interface_table_state.subnet_masks}/>
                </th>
                <th>
                    <UpDown text="Gateway" bind:state={interface_table_state.gateway}/>
                </th>
                <th>
                    <UpDown text="DNS Server(s)" bind:state={interface_table_state.dns_servers}/>
                </th>
                <th>
                    <div />
                </th>
            </tr>
        </thead>
        <tbody>
            {#each nics as nic}
                <ContextMenu show={true} />
                <tr>
                    <td><div>{nic.interface_name}</div></td>
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
                    <td><div>{nic.gateway || "-"}</div></td>
                    <td>
                        <div>
                            {#each nic.dns_servers as dns_server}
                                <span>{dns_server}</span>
                            {/each}
                        </div>
                    </td>
                    <td>
                        <div>
                            <button>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 128 512"
                                    fill="currentcolor"
                                    ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                                        d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"
                                    /></svg
                                >
                            </button>
                        </div>
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>

    <!-- Preset Table -->
    <table id="preset_table" hidden>
        <thead>
            <tr>
                <th><button>Preset</button></th>
                <th><button>IP Address(s)</button></th>
                <th><button>Subnet Mask(s)</button></th>
                <th><button>Gateway</button></th>
                <th><button>DNS Server(s)</button></th>
                <th>
                    <div>
                        <button>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 128 512"
                                fill="currentcolor"
                                ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                                    d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"
                                /></svg
                            >
                        </button>
                    </div>
                </th>
            </tr>
        </thead>
        <tbody>
            {#each presets as preset}
                <tr
                    on:select={() => {
                        if (preset.name !== presetSelected) {
                            presetSelected = preset.name;
                            presetSelectedEdit = false;
                        }
                    }}
                    on:edit={() => {
                        if (preset.name !== "DHCP") presetSelectedEdit = true;
                    }}
                >
                    {#if presetSelected === preset.name && presetSelectedEdit}
                        <td>
                            <div
                                style="padding: calc(var(--pad)/2); gap: calc(var(--pad) / 2);"
                            >
                                <input
                                    value={preset.name}
                                    placeholder={preset.name}
                                />
                            </div>
                        </td>
                        <td>
                            <div
                                style="padding: calc(var(--pad)/2); gap: calc(var(--pad) / 2);"
                            >
                                {#each preset.ip_and_masks as ip_and_mask}
                                    <input
                                        value={ip_and_mask.ip_address}
                                        placeholder={ip_and_mask.ip_address}
                                    />
                                {/each}
                                <input placeholder="192.168.1.1" />
                            </div>
                        </td>
                        <td>
                            <div
                                style="padding: calc(var(--pad)/2); gap: calc(var(--pad) / 2);"
                            >
                                {#each preset.ip_and_masks as ip_and_mask}
                                    <input
                                        value={ip_and_mask.subnet_mask}
                                        placeholder={ip_and_mask.subnet_mask}
                                    />
                                {/each}
                                <input placeholder="255.255.255.0" />
                            </div>
                        </td>
                        <td>
                            <div
                                style="padding: calc(var(--pad)/2); gap: calc(var(--pad) / 2);"
                            >
                                <input
                                    value={preset.gateway}
                                    placeholder={preset.gateway}
                                />
                            </div>
                        </td>
                        <td>
                            <div
                                style="padding: calc(var(--pad)/2); gap: calc(var(--pad) / 2);"
                            >
                                {#each preset.dns_servers as dns_server}
                                    <input
                                        value={dns_server}
                                        placeholder={dns_server}
                                    />
                                {/each}
                                <input placeholder="1.1.1.1" />
                            </div>
                        </td>
                        <td>
                            <div
                                style="padding: calc(var(--pad)/2); gap: calc(var(--pad) / 2);"
                            >
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                        style="fill: var(--color-bg-green)"
                                    >
                                        <path
                                            d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
                                        />
                                    </svg>
                                </button>
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512"
                                        style="fill: var(--color-bg-red)"
                                        ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                                            d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
                                        /></svg
                                    >
                                </button>
                            </div>
                        </td>
                    {:else}
                        <td><div>{preset.name}</div></td>
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
                        <td><div>{preset.gateway || "-"}</div></td>
                        <td>
                            <div>
                                {#each preset.dns_servers as dns_server}
                                    <span>{dns_server}</span>
                                {/each}
                            </div>
                        </td>
                        <td>
                            <div>
                                <button>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 128 512"
                                        fill="currentcolor"
                                        ><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path
                                            d="M64 360c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zm0-160c30.9 0 56 25.1 56 56s-25.1 56-56 56s-56-25.1-56-56s25.1-56 56-56zM120 96c0 30.9-25.1 56-56 56S8 126.9 8 96S33.1 40 64 40s56 25.1 56 56z"
                                        /></svg
                                    >
                                </button>
                            </div>
                        </td>
                    {/if}
                </tr>
            {/each}
        </tbody>
    </table>
</article>

<style>
    article {
        display: flex;
        flex-wrap: wrap;
        gap: var(--gap);
        column-gap: calc(var(--gap) * 4);
        justify-content: flex-start;
        margin: var(--pad);
        align-items: flex-start;
    }
    th {
        padding: calc(var(--pad) / 2) 0;
    }
    td {
        padding: 0;
        vertical-align: top;
    }
    th,
    td {
        min-width: fit-content;
    }

    /* Setting fixed_columns */
    .fixed_columns th,
    .fixed_columns td {
        min-width: 11rem;
    }
    th:last-child,
    td:last-child {
        min-width: 2rem;
    }
    th > div,
    td > div {
        display: grid;
        /* gap: calc(var(--pad) / 2); */
        gap: var(--pad);
    }
    th:last-child > div,
    td:last-child > div {
        padding: 0;
        gap: 0;
    }
    div,
    button {
        padding: var(--pad);
        background-color: transparent;
    }
    input {
        padding: calc(var(--pad) / 2);
        /* margin-top: var(--pad); */
        /* background-color: var(--color-bg-section); */
        /* background-color: transparent; */
        /* border: var(--border); */
        /* box-shadow: inset 0px 0px 0px var(--border-thickness) var(--color-border); */
        width: 10rem;
    }
    svg {
        vertical-align: middle;
        height: 1em;
    }
</style>
