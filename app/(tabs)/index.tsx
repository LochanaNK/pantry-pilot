import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { recipeController } from "@/controllers/recipeController";
import { Recipe } from "@/types/Recipe";
import { RecipeCard } from "@/components/RecipeCard";


export default function HomeScreen() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFindRecipes = async () => {
    setLoading(true);
    try {
      const foundRecipes = await recipeController.findByPantry();
      setRecipes(foundRecipes);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-orange-50">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#ea580c" />
          <Text className="mt-4 text-orange-600 font-medium">
            Cooking up ideas...
          </Text>
        </View>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          ListEmptyComponent={
            <View className="mt-20 items-center">
              <Ionicons name="fast-food-outline" size={80} color="#fed7aa" />
              <Text className="text-orange-500 text-center mt-4 px-10 text-lg">
                Tap the chef button to find recipes based on your pantry!
              </Text>
            </View>
          }
        />
      )}

      <TouchableOpacity
        onPress={handleFindRecipes}
        disabled={loading}
        className="absolute bottom-10 right-6 bg-orange-600 p-4 rounded-full shadow-lg flex-row items-center"
      >
        <Ionicons name="restaurant-outline" size={24} color="white" />
        <Text className="text-white font-bold ml-2">Find Recipes</Text>
      </TouchableOpacity>
    </View>
  );
}
