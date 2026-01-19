import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Keyboard,
  TextInput,
} from "react-native";
import { PantryItem, setupDatabase } from "@/services/database";
import { pantryController } from "@/controllers/pantryController";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

export default function PantryScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    setupDatabase();
    refreshPantry();
  }, []);

  const refreshPantry = () => {
    const data = pantryController.getall();
    setItems(data);
  };

  const handleAdd = () => {
    if (inputValue.trim().length > 0) {
      pantryController.create(inputValue.trim(), quantity.trim() || "1");
      setInputValue("");
      setQuantity("");
      Keyboard.dismiss();
      refreshPantry();
    }
  };

  const handleDelete = (id: number) => {
    pantryController.remove(id);
    refreshPantry();
  };

  return (
    <View className="flex-1 bg-orange-50 p-6 pt-12">
      {/* input fields */}
      <View className="flex-row mb-8 gap-1">
        <TextInput
          className="flex-1 bg-white p-4 rounded-l-2xl border border-orange-300 text-lg shadow-md shadow-orange-500"
          placeholder="add ingredients"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TextInput
          className="p-2 bg-white w-14 border border-orange-300 text-lg shadow-md shadow-orange-500 text-center"
          placeholder="Qty"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          maxLength={6}
        />
        <TouchableOpacity
          onPress={handleAdd}
          className="bg-orange-500 p-4 rounded-r-2xl justify-center items-center shadow-md "
        >
          <Ionicons name="add-circle-outline" size={30} color="#ffedd5" />
        </TouchableOpacity>
      </View>

      {/* Pantry list */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex-row justify-between items-center bg-white p-4 mb-3 rounded-xl shadow-sm border border-orange-200">
            <Text
              className="flex-1 text-xl text-slate-700 font-medium capitalize tex-bold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
            <Text className="w-20 text-xl text-semibold border-l border-orange-300 pl-4">
              {item.quantity}
            </Text>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <MaterialCommunityIcons
                name="delete-outline"
                color="#ef4444"
                size={24}
              />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text className="text-center text-orange-700 text-xl mt-10">
            Your pantry is empty. Add some ingredients!
          </Text>
        }
      />
    </View>
  );
}
