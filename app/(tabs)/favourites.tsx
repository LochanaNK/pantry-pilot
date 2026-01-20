import React, { useState, useCallback } from "react";
import { View, Text, FlatList } from "react-native";
import { useFocusEffect } from "expo-router";
import { favouriteController } from "@/controllers/favouritesController";
import { RecipeCard } from "@/components/RecipeCard";
import { Ionicons } from "@expo/vector-icons";

export default function FavouritesScreen() {
  const [favourites, setFavourites] = useState<any[]>([]);

  useFocusEffect(
    useCallback(() => {
      const data = favouriteController.getAll();
      setFavourites(data);
    }, []),
  );

  return (
    <View className="flex-1 bg-orange-50">
      <FlatList
        data={favourites}
        keyExtractor={(item) => item.recipeId.toString()}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item }) => (
          <RecipeCard
            recipe={{
              id: item.recipeId,
              title: item.title,
              image: item.image,
              usedIngredientCount: item.usedCount,
              missedIngredientCount: item.missedCount,
            }}
          />
        )}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center mt-20">
            <Ionicons name="heart-dislike-outline" size={80} color="#fed7aa" />
            <Text className="text-orange-500 text-xl font-bold mt-4">
              No favourites yet!
            </Text>
            <Text className="text-slate-400 text-xl text-center px-10 mt-2">
              Save recipes you love by tapping the heart icon on any recipe
              detail page.
            </Text>
          </View>
        }
      />
    </View>
  );
}
