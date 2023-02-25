# Windows IP Settings / Presets

Quickly change and save network settings.
For people that plug into a lot of networks

## Download / Installer

https://github.com/TreyTiderman/IP-Tool/releases/download/v0.1.0/IP-Tool_0.1.0_x64_en-US.msi

# Source Code

## Setup
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

## TODO
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
