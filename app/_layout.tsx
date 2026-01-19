import { Stack } from "expo-router";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  return (
    <Stack>
      
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

  
      <Stack.Screen
        name="recipe/[id]"
        options={{
          presentation: "card",
          title: "Recipe Detail",
          headerTintColor: "#ea580c",
        }}
      />
    </Stack>
  );
}
