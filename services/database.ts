import * as SQLite from 'expo-sqlite';

export const db = SQLite.openDatabaseSync('pantry.db');

export const setupDatabase = () => {
    try {
        db.execSync(`
        CREATE TABLE IF NOT EXISTS items(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            quantity TEXT
        );
    `);
        db.execSync(`
        CREATE TABLE IF NOT EXISTS favourites(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            recipeId INTEGER UNIQUE NOT NULL,
            title TEXT NOT NULL,
            image TEXT,
            usedCount INTEGER,
            missedCount INTEGER,
            instructions TEXT,
            ingredients TEXT,
            servings INTEGER,
            readyMinutes INTEGER
        );
    `);
        console.log("Database setup completed.");
    } catch (error) {
        console.log("database setup error:", error);
    }
};

