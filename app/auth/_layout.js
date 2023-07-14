import { Link, Slot } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { Stack } from "expo-router/stack";
import { Dimensions, SafeAreaView, View } from "react-native";
import Constants from "expo-constants";

const windowHeight = Dimensions.get("window").height;

export default function AuthLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
            color: "black",
          },
        }}
      />
    </>
  );
}
