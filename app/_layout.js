import { Link, Slot } from "expo-router";
import { Tabs } from "expo-router/tabs";
import { Stack } from "expo-router/stack";
import { Dimensions, SafeAreaView, View } from "react-native";
import Constants from "expo-constants";

const windowHeight = Dimensions.get("window").height;

export default function AppLayout() {
  return (
    <>
      <View>
        <SafeAreaView
          style={{
            paddingTop: Constants.statusBarHeight,
            // paddingBottom: windowHeight,
            paddingHorizontal: 25,
            paddingVertical: 50,
            height: "100%",
          }}
        >
          <Slot
            style={{
              backgroundColor: "pink",
            }}
          />
        </SafeAreaView>
      </View>
    </>
  );
}
