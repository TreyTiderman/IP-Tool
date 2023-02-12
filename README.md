# Testing Tauri

## Run
```
npm run tauri dev
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
