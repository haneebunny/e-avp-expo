import { Slot } from "expo-router";
import {
  Dimensions,
  SafeAreaView,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";
import { color } from "../config/color";
import { NavigationContainer } from "expo-router/src/NavigationContainer";
import { socket } from "../src/socket";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: color.blue }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 15,
        fontWeight: "400",
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  default: ({ text1, props }) => (
    <View className=" bg-gray-200 opacity-70 w-4/5 h-10 rounded-3xl p-1">
      <Text className="m-auto text-[12px]">{text1}</Text>
    </View>
  ),
};

export default function AppLayout() {
  return (
    <>
      <RecoilRoot>
        {/* <NavigationContainer> */}
        <SafeAreaView
          style={{
            paddingTop: Constants.statusBarHeight,
            paddingHorizontal: 0,
            paddingVertical: 0,

            flex: 1,
          }}
        >
          {/* <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}> */}
          <Slot />
          {/* </KeyboardAvoidingView> */}
          {/* </ScrollView> */}
          <Toast config={toastConfig} />
        </SafeAreaView>
        {/* </NavigationContainer> */}
      </RecoilRoot>
    </>
  );
}
