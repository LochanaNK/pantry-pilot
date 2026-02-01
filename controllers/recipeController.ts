import { pantryController } from "./pantryController";
import { Recipe, RecipeDetail } from "@/types/Recipe";

const apiKey = process.env.EXPO_PUBLIC_SPOONACULAR_API_KEY;
const baseUrl = process.env.EXPO_PUBLIC_BASE_URL;


export const recipeController = {

    findByPantry: async (): Promise<Recipe[]> => {
        try {
            const pantryItems = pantryController.getall();

            if (!pantryItems || pantryItems.length === 0) {
                console.log("Pantry is empty");
                return [];
            }

            const ingredientsQuery = pantryItems
                .map((item) => item.name.trim())
                .join(",");


            const response = await fetch(
                `${baseUrl}/findByIngredients?apiKey=${apiKey}&ingredients=${ingredientsQuery}&number=20&ranking=1`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch recipes");
            }

            const data = await response.json();
            return data as Recipe[];
        } catch (error) {
            console.error("Recipe fetch error:", error);
            return [];
        }
    },

    getDetails: async (id: number): Promise<RecipeDetail | null> => {
        try {
            const url = `${baseUrl}/${id}/information?apiKey=${apiKey}`;
            console.log("Fetching Details from url");

            const response = await fetch(url);

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`❌ API Error ${response.status}:`, errorText);
                throw new Error("Could not fetch recipe details");
            }

            const data = await response.json();
            return data as RecipeDetail;
        } catch (error) {
            console.error("Detail Fetch Error:", error);
            return null;
        }
    }
};