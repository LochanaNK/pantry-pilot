import {db} from '@/services/database';

export const favouriteController = {
    add:(recipeId:number, title:string,image:string,used:number,missed:number,instructions:string,ingredients:any)=>{
        try{
            const ingredientsString = JSON.stringify(ingredients);
            db.runSync(
                'INSERT INTO favourites (recipeId,title,image,usedCount,missedCount,instructions,ingredients) VALUES(?,?,?,?,?,?,?)'
                ,[recipeId,title,image,used,missed,instructions,ingredientsString]
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
        try{
            return db.getAllSync('SELECT * FROM favourites ORDER BY id DESC');
        }catch(error){
            console.error("failed to fetch favourites:",error);
            return [];
        }
    },
    
    getById: (recipeId: number) => {
    try {
      const result = db.getFirstSync<any>(
        'SELECT * FROM favourites WHERE recipeId = ?',
        [recipeId]
      );
      if (result && result.ingredients) {
        // Turn the string back into a real JavaScript array
        result.extendedIngredients = JSON.parse(result.ingredients);
      }
      return result;
    } catch (error) {
      return null;
    }
  },
};