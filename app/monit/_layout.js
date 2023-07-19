import { Slot } from "expo-router";
import { Dimensions, SafeAreaView, View } from "react-native";
import Constants from "expo-constants";

export default function MonitLayout() {
  return (
    <>
      <View>
        <SafeAreaView
          style={{
            paddingTop: Constants.statusBarHeight,
            paddingHorizontal: 0,
            paddingVertical: 0,
            height: "100%",
          }}
        >
          <Slot />
        </SafeAreaView>
      </View>
    </>
  );
}
