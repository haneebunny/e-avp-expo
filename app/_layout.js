import { Link } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { Stack } from "expo-router/stack";
import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";

export default function AppLayout() {
  return (
    <>
      <Tabs></Tabs>
      {/* <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "transparent",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      > */}
      {/* <SafeAreaView
        style={{ paddingTop: Constants.statusBarHeight }}
      ></SafeAreaView> */}
      {/* <Tabs>
<Tabs.Screen
          // Name of the dynamic route.
          name="hahaha"
          options={{
            // Ensure the tab always links to the same href.
            href: "/",
            // OR you can use the Href object:
            //   href: {
            //     pathname: "/[user]",
            //     params: {
            //       user: "evanbacon",
            //     },
            //   },
          }}
        />
        </Tabs>
        
      </Stack> */}
    </>
  );
}
