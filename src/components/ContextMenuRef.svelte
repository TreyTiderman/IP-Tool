<!-- 
Github @dukenmarga, July 2022
Context Menu is small menu that displayed when user right-click the mouse on browser.
Think of it as a way to show Refresh option on Microsoft Windows when right-click on desktop.
Known bug:
    - If the browser loads the content for the first time, showMenu set to false.
    Hence, we cannot get menu.h and menu.y dimension, since context menu has not been available at DOM.
    The first right click will not shown properly when right-click occurs around the edge (bottom part
    and right part) of the browser.

Inspired from: Context Menu https://svelte.dev/repl/3a33725c3adb4f57b46b597f9dade0c1?version=3.25.0
-->
<script>
    let pos = { x: 0, y: 0 };
    let menu = { h: 0, y: 0 };
    let browser = { h: 0, y: 0 };
    let showMenu = false;

    function rightClickContextMenu(e) {
        showMenu = true;
        browser = {
            w: window.innerWidth,
            h: window.innerHeight,
        };
        pos = {
            x: e.clientX,
            y: e.clientY,
        };
        if (browser.h - pos.y < menu.h) pos.y = pos.y - menu.h;
        if (browser.w - pos.x < menu.w) pos.x = pos.x - menu.w;
    }
    function onPageClick(e) {
        showMenu = false;
    }
    function getContextMenuDimension(node) {
        let height = node.offsetHeight;
        let width = node.offsetWidth;
        menu = {
            h: height,
            w: width,
        };
    }
    let menuItems = [
        {
            name: "addItem",
            onClick: () => {

            },
            displayText: "Add Item",
            class: "fa-solid fa-plus",
        },
        {
            name: "emptyicons",
            onClick: () => {

            },
            displayText: "Empty Icon",
            class: "fa-solid fa-square",
        },
        {
            name: "zoom",
            onClick: () => {

            },
            displayText: "Zoom",
            class: "fa-solid fa-magnifying-glass",
        },
        {
            name: "printMenu",
            onClick: () => {

            },
            displayText: "Print",
            class: "fa-solid fa-print",
        },
        {
            name: "hr",
        },
        {
            name: "settings",
            onClick: () => {

            },
            displayText: "Settings",
            class: "fa-solid fa-gear",
        },
        {
            name: "hr",
        },
        {
            name: "trash",
            onClick: () => {

            },
            displayText: "Trash",
            class: "fa-solid fa-trash-can",
        },
    ];
</script>

{#if showMenu}
    <nav
        use:getContextMenuDimension
        style="position: absolute; top:{pos.y}px; left:{pos.x}px; z-index: 99"
    >
        <div class="navbar" id="navbar">
            <ul>
                {#each menuItems as item}
                    {#if item.name == "hr"}
                        <hr/>
                    {:else}
                        <li>
                            <button on:click={item.onClick}>
                                <i class={item.class}/>
                                {item.displayText}
                            </button>
                        </li>
                    {/if}
                {/each}
            </ul>
        </div>
    </nav>
{/if}

<svelte:window
    on:contextmenu|preventDefault={rightClickContextMenu}
    on:click={onPageClick}
/>

<style>
    * {
        padding: 0;
        margin: 0;
    }
    .navbar {
        display: inline-flex;
        border: 1px #999 solid;
        width: 170px;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        flex-direction: column;
    }
    .navbar ul {
        margin: 6px;
    }
    ul li {
        display: block;
        list-style-type: none;
        width: 1fr;
    }
    ul li button {
        font-size: 1rem;
        color: #222;
        width: 100%;
        height: 30px;
        text-align: left;
        border: 0px;
        background-color: #fff;
    }
    ul li button:hover {
        color: #000;
        text-align: left;
        border-radius: 5px;
        background-color: #eee;
    }
    ul li button i {
        padding: 0px 15px 0px 10px;
    }
    ul li button i.fa-square {
        color: #fff;
    }
    ul li button:hover > i.fa-square {
        color: #eee;
    }
    ul li button:hover > i.warning {
        color: crimson;
    }
    :global(ul li button.info:hover) {
        color: navy;
    }
    hr {
        border: none;
        border-bottom: 1px solid #ccc;
        margin: 5px 0px;
    }
</style>
