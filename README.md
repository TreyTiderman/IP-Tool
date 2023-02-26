# Testing Tauri

## Setup

https://tauri.app/v1/guides/getting-started/prerequisites

```
npm install
```

## Run

```
npm run tauri dev
```

## Build

```
npm run tauri build
```

## Force Admin

https://github.com/nabijaczleweli/rust-embed-resource#example-embedding-a-windows-manifest

## Logging?

https://github.com/tauri-apps/tauri-plugin-log

## Add to `tauri.conf.json` for offline install of WebView2

```json
{
  "tauri": {
    "bundle": {
      "windows": {
        "webviewInstallMode": {
          "type": "offlineInstaller"
        }
      }
    }
  }
}
```
