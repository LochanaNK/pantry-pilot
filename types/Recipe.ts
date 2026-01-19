export interface Recipe {
    id: number;
    title: string;
    image: string;
    usedIngredientCount: number;
    missedIngredientCount: number;
}

export interface ExtendedIngredient{
    id:number;
    original:string;
}

export interface RecipeDetail extends Recipe{
    instructions:string;
    extendedIngredients:ExtendedIngredient[];
    readyInMinutes:number;
    servings: number;
}