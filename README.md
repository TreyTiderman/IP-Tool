# IP Settings / Presets (Windows)

Quickly change and save network settings.
For people that plug into a lot of networks

### Download

[Installer](https://github.com/TreyTiderman/IP-Tool/releases/download/v0.1.0/IP-Tool_0.1.0_x64_en-US.msi)
/
[Portable](https://github.com/TreyTiderman/IP-Tool/releases/download/v0.1.0/IP-Tool_0.1.0_x64_en-US.msi)

![Preview UI](./public/preview.png)

# Source Code

### Setup

https://tauri.app/v1/guides/getting-started/prerequisites

```
npm install
```

### Run

```
npm run tauri dev
```

### Build

```
npm run tauri build
```

# Notes

### TODO

- [ ] alternating colors shift with contextmenu
- [ ] Interface friendly name change
- [ ] row moving
- [ ] table sorting
- [ ] routes page

### Force Admin

https://github.com/nabijaczleweli/rust-embed-resource#example-embedding-a-windows-manifest

### Logging?

https://github.com/tauri-apps/tauri-plugin-log

### Add to `tauri.conf.json` for offline install of WebView2

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
