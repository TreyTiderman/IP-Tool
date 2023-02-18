<script>
    import { invoke } from "@tauri-apps/api/tauri";
    import { settings } from "../js/settings";
    import ContextMenu from "../components/ContextMenu.svelte";
    import UpDown from "../components/UpDown.svelte";

    // Variables
    const interface_table_state = {
        interface: "NONE",
        ip_addresses: "NONE",
        subnet_masks: "NONE",
        gateway: "NONE",
        dns_servers: "NONE",
    };
    const interface_table_contextmenu = [
        {
            text: "Edit",
            class: "fa-solid fa-pen-to-square",
            onClick: () => {
                interfaceEdit = true;
            },
        },
        {
            text: "hr",
        },
        {
            text: "Set",
            class: "fa-solid fa-check",
            onClick: () => {},
        },
        {
            text: "Add",
            class: "fa-solid fa-plus",
            onClick: () => {},
        },
        {
            text: "hr",
        },
        {
            text: "Delete",
            class: "fa-solid fa-trash",
            onClick: () => {},
        },
    ];
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
    let interfaceSelected = "default_198";
    let interfaceEdit = false;

    // Functions
    async function updateNics() {
        nics = [];
        const output = await invoke("get_interfaces");
        const nicsTemp = JSON.parse(output);
        nicsTemp.forEach((nic) => {
            if (
                nic.ip_and_masks[0]?.ip_address &&
                nic.ip_and_masks[0]?.ip_address !== "127.0.0.1"
            ) {
                nic.dns_servers = [nic.dns_server_1, nic.dns_server_2];
                nic.edit = JSON.parse(
                    JSON.stringify({
                        gateway: nic.gateway,
                        ip_and_masks: nic.ip_and_masks,
                        dns_servers: nic.dns_servers,
                    })
                );
                nics.push(nic);
                nics = nics;
            }
        });
        // console.log("nics", nics);
    }
    function focus(element) {
        element.focus();
    }
    function confirmInterfaceEdit(nic) {
        nic.edit.ip_and_masks = nic.edit.ip_and_masks.filter(
            (ip_mask) => ip_mask.ip_address !== ""
        );
        nic.edit.dns_servers = nic.edit.dns_servers.filter(
            (dns_server) => dns_server !== ""
        );
        interfaceEdit = false;
        nics = nics;
    }
    function confirmPresetEdit(preset) {
        preset.edit.ip_and_masks = preset.edit.ip_and_masks.filter(
            (ip_mask) => ip_mask.ip_address !== ""
        );
        preset.edit.dns_servers = preset.edit.dns_servers.filter(
            (dns_server) => dns_server !== ""
        );
        presetEdit = false;
        presets = presets;
    }

    import { onMount } from "svelte";
    onMount(async () => {
        await updateNics();
    });

    // Debug
    $: console.log("nics", nics);
</script>

<!-- Interface Table -->
<table id="interface_table">
    <thead>
        <tr>
            <th>
                <UpDown
                    text="Interface"
                    bind:state={interface_table_state.interface}
                />
            </th>
            <th>
                <UpDown
                    text="IP Address(s)"
                    bind:state={interface_table_state.ip_addresses}
                />
            </th>
            <th>
                <UpDown
                    text="Subnet Mask(s)"
                    bind:state={interface_table_state.subnet_masks}
                />
            </th>
            <th>
                <UpDown
                    text="Gateway"
                    bind:state={interface_table_state.gateway}
                />
            </th>
            <th>
                <UpDown
                    text="DNS Server(s)"
                    bind:state={interface_table_state.dns_servers}
                />
            </th>
            <th>
                <div />
            </th>
        </tr>
    </thead>
    <tbody>
        {#each nics as nic}
            <!-- Editable Row -->
            {#if interfaceSelected === nic.interface_name && interfaceEdit}
                <ContextMenu
                    bind:menu={nic.menu}
                    on:any_click={() => nic.menu.hide()}
                    on:any_contextmenu={() => nic.menu.hide()}
                />
                <tr>
                    <td>
                        <div>
                            <span>
                                {nic.interface_name}
                            </span>
                        </div>
                    </td>
                    <td>
                        <div>
                            {#each nic.edit.ip_and_masks as ip_and_mask, index}
                                {#if index === 0}
                                    <span
                                        use:focus
                                        contenteditable="true"
                                        on:input={(event) => {
                                            nic.edit.ip_and_masks[
                                                index
                                            ].ip_address =
                                                event.target.innerText;
                                        }}
                                    >
                                        {ip_and_mask.ip_address}
                                    </span>
                                {:else}
                                    <span
                                        contenteditable="true"
                                        on:input={(event) => {
                                            nic.edit.ip_and_masks[
                                                index
                                            ].ip_address =
                                                event.target.innerText;
                                        }}
                                    >
                                        {ip_and_mask.ip_address}
                                    </span>
                                {/if}
                            {/each}
                            <button
                                on:click={() => {
                                    nic.edit.ip_and_masks.push({
                                        ip_address: "",
                                        subnet_mask: "",
                                    });
                                }}
                            >
                                <i class="fa-solid fa-plus" />
                            </button>
                        </div>
                    </td>
                    <td>
                        <div>
                            {#each nic.edit.ip_and_masks as ip_and_mask, index}
                                <span
                                    contenteditable="true"
                                    on:input={(event) => {
                                        nic.edit.ip_and_masks[
                                            index
                                        ].subnet_mask = event.target.innerText;
                                    }}
                                >
                                    {ip_and_mask.subnet_mask}
                                </span>
                            {/each}
                        </div>
                    </td>
                    <td>
                        <div>
                            <span
                                contenteditable="true"
                                on:input={() => {
                                    nic.edit.gateway = event.target.innerText;
                                }}
                            >
                                {nic.edit.gateway || "-"}
                            </span>
                        </div>
                    </td>
                    <td>
                        <div>
                            {#each nic.edit.dns_servers as dns_server, index}
                                <span
                                    contenteditable="true"
                                    on:input={() => {
                                        nic.edit.dns_server[index] =
                                            event.target.innerText;
                                    }}
                                >
                                    {dns_server}
                                </span>
                            {/each}
                            <button
                                on:click={() => {
                                    nic.edit.dns_servers.push("");
                                }}
                            >
                                <i class="fa-solid fa-plus" />
                            </button>
                        </div>
                    </td>
                    <td>
                        <div>
                            <button on:click={() => confirmInterfaceEdit(nic)}>
                                <i class="fa-solid fa-check" />
                            </button>
                        </div>
                    </td>
                </tr>

                <!-- Table Row -->
            {:else}
                <ContextMenu
                    bind:menu={nic.menu}
                    items={interface_table_contextmenu}
                    on:any_click={() => nic.menu.hide()}
                    on:any_contextmenu={() => nic.menu.hide()}
                />
                <tr
                    class:edit={interfaceSelected === nic.interface_name &&
                        interfaceEdit}
                    class:selected={interfaceSelected === nic.interface_name}
                    on:click={() => (interfaceSelected = nic.interface_name)}
                    on:contextmenu|preventDefault={(event) => {
                        interfaceSelected = nic.interface_name;
                        nic.menu.showAtEvent(event);
                    }}
                >
                    <td>
                        <div>
                            <span
                                contenteditable={interfaceSelected ===
                                    nic.interface_name && interfaceEdit}
                                style=""
                                on:input={() =>
                                    console.log(event.target.innerText)}
                            >
                                {nic.interface_name}
                            </span>
                        </div>
                    </td>
                    <td>
                        <div>
                            {#each nic.ip_and_masks as ip_and_mask}
                                <span
                                    on:input={() =>
                                        console.log(event.target.innerText)}
                                    contenteditable={interfaceSelected ===
                                        nic.interface_name && interfaceEdit}
                                >
                                    {ip_and_mask.ip_address}
                                </span>
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
                            <button
                                on:click={(event) => {
                                    console.log("nic", nic);
                                    interfaceSelected = nic.interface_name;
                                    nic.menu.showAtEvent(event);
                                }}
                            >
                                <i class="fa-solid fa-ellipsis-vertical" />
                            </button>
                        </div>
                    </td>
                </tr>
            {/if}
        {/each}
    </tbody>
</table>

<style>
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

    /* Setting fixedColumns */
    .fixedColumns th,
    .fixedColumns td {
        min-width: 10.75rem;
    }

    /* Setting tableGridLines */
    .tableGridLines th,
    .tableGridLines td {
        border: var(--border);
        border-color: var(--color-text-dim);
    }

    th:last-child,
    td:last-child {
        min-width: 2rem;
    }
    th > div,
    td > div {
        display: grid;
        gap: 0;
    }
    th:last-child > div,
    td:last-child > div {
        padding: 0;
        gap: 0;
    }

    td > div > span {
        padding: var(--pad);
    }
    tr.edit > td > div > span {
        padding: var(--pad);
    }

    tr.selected {
        /* color: var(--color-text-yellow);
        background-color: var(--color-bg-yellow); */
        box-shadow: inset 0px 0px 0px var(--border-thickness) var(--color-bg-yellow);
    }
    tr.edit {
        color: var(--color-text-red);
        background-color: var(--color-bg-red);
        box-shadow: inset 0px 0px 0px var(--border-thickness) var(--color-bg-red);
    }

    button {
        padding: var(--pad);
        background-color: transparent;
        border-radius: 0;
    }
</style>