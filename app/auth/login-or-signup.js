import { Stack } from "expo-router";
import React from "react";
import LoginOrSignup from "../../src/components/auth/LoginOrSignup";

const LoginPage = () => {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <LoginOrSignup />
    </>
  );
};

export default LoginPage;
