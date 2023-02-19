# Testing Tauri

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
