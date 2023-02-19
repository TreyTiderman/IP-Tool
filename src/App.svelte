<script>
    // Imports
    import { global } from "./js/global";
    import { settings } from "./js/settings";
    import { Command } from "@tauri-apps/api/shell";

    // Components
    import Header from "./layout/Header.svelte";
    import Main from "./layout/Main.svelte";

    // Check if app is ran as administrator
    let isAdmin = true;
    async function checkAdmin() {
        const cmd = new Command("net", "session");
        console.log(`command: net session`);
        cmd.stdout.on("data", (line) => {
            console.log(`command stdout: "${line}"`);
        });
        cmd.stderr.on("data", (line) => {
            console.log(`command stdout: "${line}"`);
            if (line.startsWith("System error 5 has occurred")) isAdmin = false;
        });
        await cmd.spawn();
    }

    // Startup
    import { onMount } from "svelte";
    onMount(async () => {
        checkAdmin();
    });

    // Debug
    $: console.log("global", $global);
</script>

<div
    id="app"
    style="border: {$settings.hasDecorations ? 'none' : 'var(--border)'}"
>
    <Header />
    <div hidden={isAdmin}>
        <i class="fa-solid fa-circle-exclamation"/>
        Run as Administrator in order to change settings
    </div>
    <Main />
</div>

<style>
    #app {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
    }
    #app > div {
        background-color: var(--color-bg-red);
        color: var(--color-text-red);
        padding: var(--pad);
        margin: var(--pad);
    }
</style>
