import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Recipe } from "@/types/Recipe";
import { useRouter } from "expo-router";

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/recipe/${recipe.id}` as any)}
      className="w-full bg-white rounded-3xl mb-6 overflow-hidden shadow-sm border border-orange-100 p-4"
    >
        <Text className="font-semibold text-xl text-orange-600 mb-2">
            {recipe.title}
        </Text>
      <Image
        source={{ uri: recipe.image }}
        className="w-auto h-48 mb-2"
        resizeMode="cover"
      />
      <View className="flex-row items-center justify-around">
        <View className="bg-green-100 px-2 py-1 rounded-md mr-2">
          <Text className="text-green-700 text-md font-bold">
            {recipe.usedIngredientCount} Used
          </Text>
        </View>
        <View className="bg-orange-100 px-2 py-1 rounded-md">
          <Text className="text-orange-700 text-md font-bold">
            {recipe.missedIngredientCount} Missing
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
