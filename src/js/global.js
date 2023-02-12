import { writable } from 'svelte/store'

// Export Stores
export const global = writable({
    "tabs": ["IPv4", "Routes", "Settings"],
    "tabActive": "IPv4"
})