<script>
    import { settings, default_settings } from "../js/store_settings";
    let showReset = false;
</script>

<article
    class="mono"
    class:tableGridLines={$settings.tableGridLines}
    class:colored_headers={$settings.colored_headers}
    class:alternatingRowBG={$settings.alternatingRowBG}
>
    <table style="width: 100%;">
        <thead>
            <tr>
                <th>Key</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>defaultSettings</td>
                <td>
                    <button
                        hidden={showReset}
                        on:click={() => {
                            showReset = true;
                        }}
                    >
                        set
                    </button>
                    <button
                        hidden={!showReset}
                        style="color: var(--color-bg-red)"
                        on:click={() => {
                            showReset = false;
                        }}
                    >
                        no cancel!
                    </button>
                    <button
                        hidden={!showReset}
                        style="color: var(--color-bg-green)"
                        on:click={() => {
                            showReset = false;
                            $settings = default_settings;
                            localStorage.setItem("settings", JSON.stringify(default_settings));
                            location.reload(true);
                        }}
                    >
                        reset settings to default?
                    </button>
                </td>
            </tr>
            <tr>
                <td>isAlwaysOnTop</td>
                <td>
                    <button
                        on:click={() => {
                            $settings.isAlwaysOnTop = !$settings.isAlwaysOnTop;
                        }}
                    >
                        {$settings.isAlwaysOnTop}
                    </button>
                </td>
            </tr>
            <tr>
                <td>windowDecorations</td>
                <td>
                    <button
                        on:click={() => {
                            $settings.windowDecorations = !$settings.windowDecorations;
                        }}
                    >
                        {$settings.windowDecorations}
                    </button>
                </td>
            </tr>
            <tr>
                <td>theme</td>
                <td>
                    <select
                        on:input={(event) => {
                            $settings.theme = event.target.value;
                        }}
                    >
                        <option>{$settings.theme}</option>
                        {#each $settings.themes as theme}
                            {#if theme !== $settings.theme}
                                <option>{theme}</option>
                            {/if}
                        {/each}
                    </select>
                </td>
            </tr>
            <tr>
                <td>fontSize (zoom)</td>
                <td>
                    <input
                        type="number"
                        max="36"
                        min="8"
                        placeholder="16"
                        value={$settings.fontSize}
                        on:input={(event) => {
                            $settings.fontSize = event.target.value;
                        }}
                    />
                </td>
            </tr>
            <tr>
                <td>ipPollRate_ms</td>
                <td>
                    <input
                        type="number"
                        max="10000"
                        min="200"
                        placeholder="500"
                        value={$settings.ipPollRate_ms}
                        on:input={(event) => {
                            $settings.ipPollRate_ms = event.target.value;
                        }}
                    />
                </td>
            </tr>
            <tr>
                <td>startOnBoot</td>
                <td>
                    <button
                        on:click={() => {
                            $settings.startOnBoot = !$settings.startOnBoot;
                        }}
                    >
                        {$settings.startOnBoot}
                    </button>
                </td>
            </tr>
            <tr>
                <td>fixedColumns</td>
                <td>
                    <button
                        on:click={() => {
                            $settings.fixedColumns = !$settings.fixedColumns;
                        }}
                    >
                        {$settings.fixedColumns}
                    </button>
                </td>
            </tr>
            <tr>
                <td>tableGridLines</td>
                <td>
                    <button
                        on:click={() => {
                            $settings.tableGridLines = !$settings.tableGridLines;
                        }}
                    >
                        {$settings.tableGridLines}
                    </button>
                </td>
            </tr>
            <tr>
                <td>alternatingRowBG</td>
                <td>
                    <button
                        on:click={() => {
                            $settings.alternatingRowBG = !$settings.alternatingRowBG;
                        }}
                    >
                        {$settings.alternatingRowBG}
                    </button>
                </td>
            </tr>
            <tr>
                <td>colored_headers</td>
                <td>
                    <button
                        on:click={() => {
                            $settings.colored_headers = !$settings.colored_headers;
                        }}
                    >
                        {$settings.colored_headers}
                    </button>
                </td>
            </tr>
        </tbody>
    </table>
    <br>
    <table style="width: 100%;">
        <thead>
            <tr>
                <th>Shortcut</th>
                <th>Key(s)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <span>Zoom in</span>
                </td>
                <td>
                    <code>Control</code>
                    <code>=</code>
                </td>
            </tr>
            <tr>
                <td>
                    <span>Zoom out</span>
                </td>
                <td>
                    <code>Control</code>
                    <code>-</code>
                </td>
            </tr>
            <tr>
                <td>
                    <span>Toggle isAlwaysOnTop</span>
                </td>
                <td>
                    <code>Control</code>
                    <code>p</code>
                </td>
            </tr>
        </tbody>
    </table>
</article>

<style>
    article {
        padding: var(--pad);
        max-width: fit-content;
    }
    table:first-child > tbody > tr > td {
        padding-top: calc(var(--pad)/2);
        padding-bottom: calc(var(--pad)/2);
        padding-top: 0;
        padding-bottom: 0;
    }
    th:nth-child(2) {
        padding: 0 calc(var(--pad) + var(--pad) + 0.2rem);
    }
    button,
    select,
    input {
        background-color: transparent;
        min-width: 6rem;
        text-align: left;
    }
    
    code {
        font-size: 1rem;
        background-color: var(--color-bg-dim);
        background-color: transparent;
        color: var(--color-text-input);
        padding: .3rem var(--pad);
        border: var(--border);
    }
</style>
