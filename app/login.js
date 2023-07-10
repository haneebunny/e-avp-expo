import { Link } from "expo-router";
import React from "react";
import { View, Text } from "react-native";
import Login from "../src/components/authentication/Login";

const LoginPage = () => {
  return (
    <View>
      <Link href="/">홈으로</Link>
      <Login />
    </View>
  );
};

export default LoginPage;
