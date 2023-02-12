<script>
    import { settings } from "../js/settings";
</script>

<article class="mono" style="max-width: s500px;">
    <table style="width: 100%;">
        <thead>
            <tr>
                <th>Key</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody>
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
                        on:input={event => {
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
                        on:input={event => {
                            $settings.fontSize = event.target.value;
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
        </tbody>
    </table>
</article>

<style>
    article {
        padding: var(--pad);
        max-width: fit-content;
    }
    td {
        padding-top: 0;
        padding-bottom: 0;
    }
    th:nth-child(2) {
        padding: 0 calc(var(--pad) + var(--pad) + .2rem);
    }
    button,
    select,
    input {
        background-color: transparent;
    }
</style>
