import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import { recipeController } from "@/controllers/recipeController";
import { RecipeDetail } from "@/types/Recipe";

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams();
  const [detail, setDetail] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await recipeController.getDetails(Number(id));
      setDetail(data);
      setLoading(false);
    };
    fetchDetail();
  }, [id]);

  if (loading)
    return (
      <ActivityIndicator className="flex-1" size="large" color="#ea580c" />
    );
  if (!detail) return <Text>Recipe not found</Text>;

  return (
    <ScrollView className="flex-1 bg-white">
      <Image source={{ uri: detail.image }} className="w-full h-72" />
      <View className="p-6">
        <Text className="text-3xl font-bold text-slate-800">
          {detail.title}
        </Text>
        <Text className="text-orange-600 font-medium mt-1">
          ⏱️ {detail.readyInMinutes} mins | 🍽️ {detail.servings} servings
        </Text>

        <Text className="text-xl font-bold text-slate-800 mt-8 mb-4">
          Ingredients
        </Text>
        {detail.extendedIngredients.map((ing, index) => (
          <Text key={index} className="text-slate-600 text-lg mb-2">
            • {ing.original}
          </Text>
        ))}

        <Text className="text-xl font-bold text-slate-800 mt-8 mb-4">
          Instructions
        </Text>
        <Text className="text-slate-600 text-lg leading-7">
          {detail.instructions?.replace(/<[^>]*>?/gm, "") ||
            "No instructions provided."}
        </Text>
      </View>
    </ScrollView>
  );
}
