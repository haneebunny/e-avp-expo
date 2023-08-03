import { Stack } from "expo-router";
import UserInfo from "../../src/components/auth/UserInfo";
import { options } from "../../config/stack";

export default function AuthPage() {
  return (
    <>
      <Stack.Screen
        options={{
          ...options,
          title: "회원 정보",
          contentStyle: {
            backgroundColor: "#e6ebee",
          },
        }}
      />

      <UserInfo />
    </>
  );
}
