import {db} from '@/services/database';

export const favouriteController = {
    add:(recipeId:number, title:string,image:string)=>{
        try{
            db.runSync(
                'INSERT INTO favourites (recipeId,title,image) VALUES(?,?,?)'
                ,[recipeId,title,image]
            );
            console.log("Added to favourites:",recipeId);
        }catch(error){
            console.error("failed to add to favourites:",error);
        }
    },

    remove:(recipeId:number)=>{
        try{
            db.runSync('DELETE FROM favourites WHERE recipeId = ?',[recipeId]);
        }catch(error){
            console.error("Failed to remove from favourites:",error);
        }
    },

    isFavourite:(reicpeId:number):boolean=>{
        const result = db.getFirstSync<{id:number}>(
            'SELECT id FROM favourites WHERE recipeId = ?',
            [reicpeId]
           );
           return !!result;
    },

    getAll:()=>{
        return db.getAllSync('SELECT * FROM favourites');
    }
};