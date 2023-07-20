import { Stack } from "expo-router";
import Login from "../../../src/components/auth/Login";

export default function LoginPage() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <Login />
    </>
  );
}
