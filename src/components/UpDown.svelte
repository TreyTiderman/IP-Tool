<script>
    // Event Dispatcher
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    export const DIRECTIONS = {
        NONE: "NONE",
        DOWN: "DOWN",
        UP: "UP",
    };
    export let state = DIRECTIONS.NONE;
    export let text = "Column";
</script>

<div class="up_down">
    {#if state === DIRECTIONS.NONE}
        <div class="directions_none">
            <button
                on:click={() => {
                    dispatch("up");
                    state = DIRECTIONS.UP;
                }}
            >
                ▲
            </button>
            <button
                on:click={() => {
                    dispatch("down");
                    state = DIRECTIONS.DOWN;
                }}
            >
                ▼
            </button>
        </div>
        <p>{text}</p>
    {:else if state === DIRECTIONS.DOWN}
        <button
            class="directions_down"
            on:click={() => {
                dispatch("none");
                state = DIRECTIONS.NONE;
            }}
        >
            {text} ▼
        </button>
    {:else if state === DIRECTIONS.UP}
        <button
            class="directions_up"
            on:click={() => {
                dispatch("down");
                state = DIRECTIONS.NONE;
            }}
        >
            {text} ▲
        </button>
    {/if}
</div>

<style>
    .up_down {
        position: relative;
    }
    .up_down > div {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
    }
    .up_down:hover > div {
        visibility: visible;
    }
    button {
        background-color: var(--color-bg);
        border-radius: 0;
        flex-grow: 1;
    }
    p {
        padding: var(--pad);
    }

    .directions_none {
        visibility: hidden;
    }
    .directions_none > button:hover:nth-child(1) {
        color: var(--color-bg-orange);
    }
    .directions_none > button:hover:nth-child(2) {
        color: var(--color-bg-blue);
    }

    .directions_down {
        color: var(--color-bg-blue);
        text-align: left;
    }

    .directions_up {
        color: var(--color-bg-orange);
        text-align: left;
    }
</style>
