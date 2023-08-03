import { Stack } from "expo-router";
import LoginOrSignup from "../src/components/auth/LoginOrSignup";

export default function DefaultPage() {
  return (
    <>
      <Stack.Screen
        options={{
          // ...options,
          headerShown: false,
        }}
      />
      <LoginOrSignup />
    </>
  );
}
