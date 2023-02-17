use crate::netsh;
use enigo::{Enigo, MouseControllable};
use serde_json;

#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted the by Rust backend!", name)
}

#[tauri::command]
pub fn move_mouse_test() {
    let mut enigo = Enigo::new();
    enigo.mouse_move_to(500, 200);
}

#[tauri::command]
pub fn get_interfaces() -> String {
    let nics = netsh::get_interfaces();
    serde_json::to_string(&nics).unwrap()
}
