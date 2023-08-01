import { Stack } from "expo-router/stack";
import { options } from "../../config/stack";

export default function AuthLayout() {
  return (
    <>
      <Stack
        screenOptions={{
          ...options,
        }}
      />
    </>
  );
}
