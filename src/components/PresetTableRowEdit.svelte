<script>
    import { clone, validIPv4, validMask } from "../js/helper";

    // Components
    import ContextMenu from "./ContextMenu.svelte";

    // Event Dispatcher
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export let selected = true;
    export let preset = {
        name: "Ethernet",
        gateway: "192.168.1.254",
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
    const edit = clone(preset);

    let contextMenu;
    const contextMenuItems = [
        // {
        //     text: "Confirm",
        //     class: "fa-solid fa-check",
        //     onClick: () => confirm(),
        // },
        {
            text: "Cancel",
            class: "fa-solid fa-xmark",
            onClick: () => cancel(),
        },
        {
            text: "hr",
        },
        {
            text: "Add IP",
            class: "fa-solid fa-plus",
            onClick: () => addBlankIP(),
        },
        {
            text: "Add DNS server",
            class: "fa-solid fa-plus",
            onClick: () => addBlankDNS(),
        },
        {
            text: "hr",
        },
        {
            text: "Remove Blanks",
            class: "fa-solid fa-trash",
            onClick: () => {
                removeBlankIPs();
                removeBlankDNS();
            },
        },
    ];

    function focus(element, bool) {
        if (bool) element.focus();
    }
    function removeBlankIPs() {
        edit.ip_and_masks = edit.ip_and_masks.filter(
            (ip_mask) => ip_mask.ip_address !== ""
        );
    }
    function addBlankIP() {
        removeBlankIPs();
        if (edit.ip_and_masks.length < 5) {
            edit.ip_and_masks.push({
                ip_address: "",
                subnet_mask: "",
            });
        }
    }
    function removeBlankDNS() {
        edit.dns_servers = edit.dns_servers.filter(
            (dns_server) => dns_server !== ""
        );
    }
    function addBlankDNS() {
        removeBlankDNS();
        if (edit.dns_servers.length < 2) {
            edit.dns_servers.push("");
        }
    }
    function confirm() {
        removeBlankIPs();
        removeBlankDNS();
        dispatch("confirm", edit);
    }
    function cancel() {
        dispatch("cancel");
    }

    let validInterface = true;
    $: {
        validInterface = true;
        edit.ip_and_masks.forEach((ip_and_mask) => {
            if (
                ip_and_mask.ip_address === "" &&
                ip_and_mask.subnet_mask === ""
            ) {
            } else {
                if (validIPv4(ip_and_mask.ip_address) === false) {
                    validInterface = false;
                }
                if (validMask(ip_and_mask.subnet_mask) === false) {
                    validInterface = false;
                }
            }
        });
        edit.dns_servers.forEach((dns_server) => {
            if (dns_server === "") {
            } else {
                if (validIPv4(dns_server) === false) {
                    validInterface = false;
                }
            }
        });
        if (edit.gateway === "") {
        } else {
            if (validIPv4(edit.gateway) === false) {
                validInterface = false;
            }
        }
    }
</script>

<ContextMenu
    items={contextMenuItems}
    bind:menu={contextMenu}
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
            <input
                use:focus
                type="text"
                size={edit.name.length || "1"}
                maxlength="16"
                bind:value={edit.name}
            />
        </div>
    </td>
    <td>
        <div>
            {#each edit.ip_and_masks as ip_and_mask, index}
                {#if index === 0}
                    <input
                        type="text"
                        size={ip_and_mask.ip_address.length || "1"}
                        maxlength="15"
                        class:red={!validIPv4(ip_and_mask.ip_address)}
                        bind:value={ip_and_mask.ip_address}
                    />
                {:else}
                    <input
                        type="text"
                        size={ip_and_mask.ip_address.length || "1"}
                        maxlength="15"
                        class:red={!validIPv4(ip_and_mask.ip_address)}
                        bind:value={ip_and_mask.ip_address}
                    />
                {/if}
            {/each}
            <button on:click={addBlankIP}>
                <i class="fa-solid fa-plus" />
            </button>
        </div>
    </td>
    <td>
        <div>
            {#each edit.ip_and_masks as ip_and_mask}
                <input
                    type="text"
                    size={ip_and_mask.subnet_mask.length || "1"}
                    maxlength="15"
                    class:red={!validIPv4(ip_and_mask.subnet_mask)}
                    bind:value={ip_and_mask.subnet_mask}
                />
            {/each}
        </div>
    </td>
    <td>
        <div>
            <input
                type="text"
                size={edit.gateway.length || "1"}
                maxlength="15"
                class:red={!validIPv4(edit.gateway)}
                bind:value={edit.gateway}
            />
        </div>
    </td>
    <td>
        <div>
            {#each edit.dns_servers as dns_server}
                <input
                    type="text"
                    size={dns_server.length || "1"}
                    maxlength="15"
                    class:red={!validIPv4(dns_server)}
                    bind:value={dns_server}
                />
            {/each}
            <button on:click={addBlankDNS}>
                <i class="fa-solid fa-plus" />
            </button>
        </div>
    </td>
    <td>
        <div>
            {#if validInterface}
                <button on:click={() => confirm()}>
                    <i class="fa-solid fa-check" />
                </button>
            {:else}
                <button on:click={() => cancel()}>
                    <i class="fa-solid fa-xmark" />
                </button>
            {/if}
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
        color: var(--color-text-input);
        padding: var(--pad);
    }
    tr {
        /* background-color: var(--color-bg-section); */
        /* color: var(--color-bg-red); */
        box-shadow: inset 0px 0px 0px var(--border-thickness)
            var(--color-bg-red);
    }
    button,
    input {
        padding: var(--pad);
        background-color: transparent;
        border-radius: 0;
    }
    input {
        width: auto;
    }
</style>
