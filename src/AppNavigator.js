import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "./Screens/HomeScreen.js";
import PokemonDetail from "./Screens/PokemonDetail/index.js";
import PokemonSelection from "./Screens/PokemonSelection.js";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: "NFC Pokemon" }} />
        <Stack.Screen
          name="Selection"
          component={PokemonSelection}
          options={{ title: "Choose Pokemon" }}
        />
        <Stack.Screen
          name="Detail"
          component={PokemonDetail}
          options={{ title: "Pokemon Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
