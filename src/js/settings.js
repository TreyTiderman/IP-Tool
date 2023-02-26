// Imports
import { writable } from 'svelte/store'
import { appWindow } from "@tauri-apps/api/window";
import { enable, disable, isEnabled } from "tauri-plugin-autostart-api";

// Export Store
export const settings = writable()

// Get / Init settings
const defautl_settings = {
    "fontSize": 16,
    "theme": "dark",
    "themes": ["dark", "light"],
    "isAlwaysOnTop": false,
    "windowDecorations": false,
    "startOnBoot": false,
    "fixedColumns": true,
    "tableGridLines": false,
    "ipPollRate_ms": 1000,
};
let settingsLocalStorage = localStorage.getItem("settings");
if (settingsLocalStorage === null || settingsLocalStorage === undefined || settingsLocalStorage === "") {
    settingsLocalStorage = defautl_settings
    console.log("NO stored settings. Setting to default", defautl_settings);
    settings.set(defautl_settings);
    localStorage.setItem("settings", JSON.stringify(defautl_settings));
}
else {
    const settingsLocalStorageParsed = JSON.parse(settingsLocalStorage);
    settings.set(settingsLocalStorageParsed);
    settings.update(obj => {
        Object.keys(defautl_settings).forEach(key => {
            if (obj[key] === undefined) {
                console.log(`Setting ${key} doesn't exist in localStorage. Set to default ${defautl_settings[key]}`);
                obj[key] = defautl_settings[key];
            }
        })
        return obj
    });
}

// Every settings change set the values 
settings.subscribe(async settings => {
    if (settings !== undefined && settings != defautl_settings) {
        console.log("Settings updated", settings);

        // Update Settings
        appWindow.setAlwaysOnTop(settings.isAlwaysOnTop);

        // Hide Title bar, don't hide in the Tauri config so they show unless this page loads correctly
        appWindow.setDecorations(settings.windowDecorations);

        // Theme
        document.documentElement.classList = settings.theme;

        // Font Size
        if (settings.fontSize >= 8 && settings.fontSize <= 36) {
            document.documentElement.style.fontSize = settings.fontSize + "px";
        }

        // Start on boot
        try {
            if (settings.startOnBoot) {
                await enable();
                settings.startOnBoot = await isEnabled();
            }
            else {
                await disable();
                settings.startOnBoot = await isEnabled();
            }
        }
        catch (error) {
            // console.log(error);
        }

        // Save settings to localStorage
        localStorage.setItem("settings", JSON.stringify(settings));

    }
})