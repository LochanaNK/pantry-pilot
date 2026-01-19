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

export default function PantryScreen() {
  const [items, setItems] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState("");

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
      pantryController.create(inputValue.trim());
      setInputValue("");
      Keyboard.dismiss();
      refreshPantry();
    }
  };

  const handleDelete = (id: number) => {
    pantryController.remove(id);
    refreshPantry();
  };

  return (
    <View className="flex-1 bg-slate-50 p-6 pt-12">
      <Text className="text-3xl font-bold text-slate-900 mb-6">
        My Pantry
      </Text>
      <View className="fkex-row mb-8">
        <TextInput
            className="flex-1 bg-white p-4 rounded-l-2xl border border-slate-200 text-lg"
            placeholder="add egg,milk,flour...."
            value={inputValue}
            onChangeText={setInputValue}
        />
        <TextInput
            className=""
        />
      </View>
    </View>
  );
}
