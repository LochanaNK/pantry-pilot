import { db } from '../services/database';

export const pantryController = {
    getall: () => {
        try {
            return db.getAllSync('SELECT * FROM items ORDER BY id ASC')
        } catch (error) {
            console.error("Failed to fetch items:", error);
            return [];
        }
    },

    create: (name: string, quantity:string): number | null => {
        try {
            const result = db.runSync(
                'INSERT INTO items (name,quantity) VALUES (?,?)',
                [name, quantity]
            );

            return result.lastInsertRowId;

        } catch (error) {
            console.error("Failed to add items:", error);
            return null;
        }
    },

    remove: (id: number) => {
        try {
            return db.runSync(
                'DELETE FROM items WHERE id=?', [id]
            );
        }catch(error){
            console.error("Failed to delete license:",error);
            return false;
        }
    }
}