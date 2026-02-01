import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { recipeController } from "@/controllers/recipeController";
import { RecipeDetail } from "@/types/Recipe";
import { favouriteController } from "@/controllers/favouritesController";
import { Ionicons } from "@expo/vector-icons";

export default function RecipeDetailScreen() {
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useLocalSearchParams();
  const [detail, setDetail] = useState<RecipeDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      setLoading(true);
      try{
        const savedData = await favouriteController.getById(Number(id));

        if(savedData){
          setDetail(savedData);
          setIsLiked(true);
          setLoading(false);
          console.log("fetched from database");
          return;
        }

        const apiData = await recipeController.getDetails(Number(id));
        if(apiData){
          setDetail(apiData);
          setIsLiked(favouriteController.isFavourite(apiData.id));
        }
      }catch(error){
        console.error("fetch detail error:", error);
      }finally{
        setLoading(false);
      }
    }
    fetchDetail();
}, [id]);

  const toggleLike = () => {
    if (!detail) return;

    if (isLiked) {
      favouriteController.remove(detail.id);
    } else {
      favouriteController.add(
        detail.id,
        detail.title,
        detail.image,
        detail.usedIngredientCount || 0,
        detail.missedIngredientCount || 0,
        detail.instructions || "",
        detail.extendedIngredients
      );
    }
    setIsLiked(!isLiked);
  };

  if (loading)
    return (
      <ActivityIndicator className="flex-1" size="large" color="#ea580c" />
    );
  if (!detail) return <Text>Recipe not found</Text>;

  return (
    <View className="flex-1 bg-white">
      {/* Configure the Header with the Like Button */}
      <Stack.Screen
        options={{
          title: "Recipe Details",
          headerRight: () => (
            <TouchableOpacity onPress={toggleLike} className="mr-2">
              <Ionicons
                name={isLiked ? "heart" : "heart-outline"}
                size={28}
                color={isLiked ? "#ef4444" : "#57534e"}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView className="flex-1">
        <Image source={{ uri: detail.image }} className="w-full h-72" />
        <View className="p-6">
          <Text className="text-3xl font-bold text-slate-800">
            {detail.title}
          </Text>
          <Text className="text-orange-600 font-medium text-lg mt-1">
            ⏱️ {detail.readyInMinutes} mins | 🍽️ {detail.servings} servings
          </Text>

          <Text className="text-2xl font-bold text-slate-800 mt-4 mb-4">
            Ingredients
          </Text>
          {detail.extendedIngredients.map((ing, index) => (
            <Text key={index} className="text-slate-600 text-lg text-lg mb-2">
              • {ing.original}
            </Text>
          ))}

          <Text className="text-2xl font-bold text-slate-800 mt-8 mb-4">
            Instructions
          </Text>
          <Text className="text-slate-600 text-xl leading-7  mb-8">
            {detail.instructions?.replace(/<[^>]*>?/gm, "") ||
              "No instructions provided."}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
