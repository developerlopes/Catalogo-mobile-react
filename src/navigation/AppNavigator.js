
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TouchableOpacity, Text } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";

import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const dispatch = useDispatch();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#FFFFFF" },
          headerTitleStyle: { fontWeight: "900" },
          contentStyle: { backgroundColor: "#F3F4F6" },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Produtos",
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  dispatch(logout());
                  navigation.replace("Login");
                }}
              >
                <Text style={{ color: "#DC2626", fontWeight: "900" }}>Logout</Text>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Details"
          component={ProductDetailsScreen}
          options={{ title: "Detalhes do produto" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
