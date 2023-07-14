import { Slot } from "expo-router";
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
