import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Recipe } from "@/types/Recipe";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/recipe/${recipe.id}` as any)}
      activeOpacity={0.9}
      className="w-auto bg-white rounded-[32px] mb-6 overflow-hidden shadow-xl shadow-orange-200/50 border border-orange-100"
    >
      <View className="relative">
        <Image
          source={{ uri: recipe.image }}
          className="w-full h-56"
          resizeMode="cover"
        />
      </View>

      <View className="p-5">
        <Text
          className="font-bold text-2xl text-slate-800 mb-3 leading-tight"
          numberOfLines={2}
        >
          {recipe.title}
        </Text>

        <View className="flex-row items-center justify-between border-t border-orange-50 pt-4">
          <View className="flex-row items-center">
            <Ionicons name="leaf-outline" size={18} color="#ea580c" />
            <Text className="ml-2 text-slate-500 font-medium">Ingredients</Text>
          </View>

          <View className="flex-row items-center gap-2">
            <View className="bg-green-100 px-3 py-1.5 rounded-full">
              <Text className="text-green-700 text-xs font-black">
                {recipe.usedIngredientCount} USED
              </Text>
            </View>
            
            <View className="bg-orange-100 px-3 py-1.5 rounded-full">
              <Text className="text-orange-700 text-xs font-black">
                {recipe.missedIngredientCount} +
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
