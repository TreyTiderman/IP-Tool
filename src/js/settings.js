// Imports
import { writable } from 'svelte/store'
import { appWindow } from "@tauri-apps/api/window";
import { enable, disable, isEnabled } from "tauri-plugin-autostart-api";

const settingsDefault = {
    "fontSize": 14,
    "theme": "dark",
    "themes": ["dark", "light"],
    "isAlwaysOnTop": false,
    "windowDecorations": false,
    "startOnBoot": false,
    "fixedColumns": false,
    "tableGridLines": false,
    "ipPollRate_ms": 1000,
};

// Export Store
export const settings = writable()

// Get / Init settings
let settingsLocalStorage = localStorage.getItem("settings");
if (settingsLocalStorage === null) {
    settingsLocalStorage = {
        "fontSize": 14,
        "theme": "dark",
        "themes": ["dark", "light"],
        "isAlwaysOnTop": false,
        "windowDecorations": false,
        "startOnBoot": false,
        "fixedColumns": false,
        "tableGridLines": false,
        "ipPollRate_ms": 1000,
    };
    settings.set(settingsLocalStorage);
}
else {
    settings.set(JSON.parse(settingsLocalStorage));
}

// Save settings every update
settings.subscribe(async settings => {
    if (settings !== undefined && settings != settingsDefault) {
        console.log("settings", settings);

        // Update Settings
        appWindow.setAlwaysOnTop(settings.isAlwaysOnTop);
        // Hide Title bar, don't hide in the Tauri config so they show unless this page loads correctly
        appWindow.setDecorations(settings.windowDecorations);

        document.documentElement.classList = settings.theme;

        if (settings.fontSize >= 8 && settings.fontSize <= 36) {
            document.documentElement.style.fontSize = settings.fontSize + "px";
        }

        if (settings.startOnBoot) {
            await enable();
            settings.startOnBoot = await isEnabled();
        }
        else {
            await disable();
            settings.startOnBoot = await isEnabled();
        }

        // Save settings to localStorage
        localStorage.setItem("settings", JSON.stringify(settings));

    }
})