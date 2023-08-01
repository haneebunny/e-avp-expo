import { Stack } from "expo-router";
import React from "react";
import { options } from "../../config/stack";
import LoginOrSignup from "../../src/components/auth/LoginOrSignup";

const LoginPage = () => {
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
};

export default LoginPage;
