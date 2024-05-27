// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn fat(flask: f32, empty: f32, sample: f32) -> String {
    let result = ((flask - empty) / sample) * (100.0 / 1.0);
    format!("The percentage of fat is {result}%")
}

#[tauri::command]
fn ash(ash: f32, crucible: f32, sample: f32) -> String {
    let result = ((ash - crucible) / sample) * (100.0 / 1.0);
    format!("The percentage of ash is {result}%")
}

#[tauri::command]
fn protein(nitrogen: f32) -> String {
    let result = nitrogen * 6.25; // This is the conversion factor
    format!("The percentage of protein is {result}%")
}

#[tauri::command]
fn moisture(crucible: f32, dry_matter: f32, sample: f32) -> String {
    let result = ((crucible - dry_matter) / sample) * (100.0 / 1.0);
    format!("The percentage of moisture is {result}%")
}

#[tauri::command]
fn fibre(residue: f32, ash: f32, sample: f32) -> String {
    let result = ((residue - ash) / sample) * (100.0 / 1.0);
    format!("The percentage of fibre is {result}%")
}

#[tauri::command]
fn ts(flask: f32, empty: f32, sample: f32) -> String {
    let result = ((flask - empty) / sample) * (100.0 / 1.0);
    format!("The percentage of total solid is {result}%")
}

#[tauri::command]
fn vs(residue: f32, matter: f32, sample: f32) -> String {
    let result = ((residue - matter) / sample) * (100.0 / 1.0);
    format!("The percentage of volatile solid is {result}%")
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            fat, ash, protein, moisture, fibre, ts, vs
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
