import { Stack } from "expo-router";
import Signup from "../../../src/components/auth/Signup";

export default function SignupPage() {
  return (
    <>
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "기본 정보 입력",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: "transparent" },
          headerTintColor: "#000000", // back button color
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#6D6D70", // "My home" text color
          },
          headerTitleAlign: "center",
          headerBackTitleStyle: {
            color: "black", // 모르겠음ㅎ
          },
          headerShadowVisible: false,
          headerBackground: () => {},
          backgroundColor: "white",
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <Signup />
    </>
  );
}
