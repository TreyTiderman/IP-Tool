<script>
    // Event Dispatcher
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    // Variables
    let pos = { x: 0, y: 0 };
    let menu = { h: 0, y: 0 };
    let browser = { h: 0, y: 0 };
    let show = false;
    let menuItems = [
        {
            name: "addItem",
            onClick: () => {

            },
            displayText: "Add Item",
            class: "fa-solid fa-plus",
        },
        {
            name: "hr",
        },
    ];

    // Functions
    function rightClickContextMenu(e) {
        dispatch("select")
        setTimeout(() => {            
            show = true;
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
        }, 1);
    }
    function onPageClick(e) {
        show = false;
    }
    function getContextMenuDimension(node) {
        menu = {
            h: node.offsetHeight,
            w: node.offsetWidth,
        };
    }
</script>

<!-- <svelte:window
    on:click={onPageClick}
    on:contextmenu={onPageClick}
/>

<tr style="{`${$$props.style}`}"
    on:click={() => dispatch("select")}
    on:dblclick={() => dispatch("edit")}
    on:contextmenu|preventDefault={rightClickContextMenu}
>
    <slot />
</tr> -->

{#if show}
    <nav
        use:getContextMenuDimension
        style="position: absolute; top:{pos.y}px; left:{pos.x}px; z-index: 99"
    >
        <div class="navbar">
            <button class="flex" on:click={() => dispatch("edit")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.8 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z"/></svg>
                <span>Edit</span>
            </button>
            <hr />
            <button class="flex" on:click={() => dispatch("set")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                Set
            </button>
            <button class="flex" on:click={() => dispatch("add")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"/></svg>
                Add
            </button>
            <hr />
            <button class="flex" on:click={() => dispatch("delete")}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--! Font Awesome Pro 6.2.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>
                Delete
            </button>
        </div>
    </nav>
{/if}

<style>
    .navbar {
        display: flex;
        gap: var(--pad);
        min-width: 15rem;
        background-color: var(--color-bg-section);
        border-radius: var(--radius-lg);
        overflow: hidden;
        border: var(--border);
        flex-direction: column;
        padding: var(--pad);
    }
    button {
        text-align: left;
        background-color: var(--color-bg-section);
    }
    hr {
        background-color: var(--color-border);
        margin: 0 auto;
        /* margin: var(--pad) auto; */
    }
</style>
