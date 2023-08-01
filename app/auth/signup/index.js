import { Stack } from "expo-router";
import Signup from "../../../src/components/auth/Signup";

export default function SignupPage() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "기본 정보 입력",
          contentStyle: {
            backgroundColor: "#e6ebee",
          },
        }}
      />
      <Signup />
    </>
  );
}
