import * as SQLite from 'expo-sqlite';

export interface PantryItem {
    id: number;
    name: string;
    qty: number;
}

export const db = SQLite.openDatabaseSync('pantry.db');

export const setupDatabase = () => {
    db.execSync(`
        CREATE TABLE IF NOT EXISTS items(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            quantity NUMBER
        );
    `);
};

