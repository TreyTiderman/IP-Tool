import { writable } from 'svelte/store'
import { Command } from "@tauri-apps/api/shell";

// Check if app is ran as administrator
async function checkAdmin() {
    console.log("Check Admin");
    const cmd = new Command("net", "session");
    cmd.stderr.on("data", (line) => {
        if (line.startsWith("System error 5 has occurred")) {
            console.log("App is not running as Administrator");
            global.update(async val => val.isAdministrator = false)
        }
    });
    await cmd.spawn();
}
checkAdmin();

const default_store = {
    "tabs": ["IPv4", "Routes", "Settings"],
    "tabActive": "IPv4",
    "isAdministrator": true,
};

export const global = writable(default_store);