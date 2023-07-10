import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import styled, { css } from "@emotion/native";
import { Link } from "expo-router";

const Login = () => {
  const handleLogin = () => {
    console.log("로그인 버튼이 클릭되었습니다.");
  };

  const handleSignup = () => {
    console.log("회원가입 버튼이 클릭되었습니다.");
  };

  return (
    <SafeAreaView className="flex flex-col w-full bg-blue-">
      <Container>
        <View className="w-full flex items-center">
          <Text>기존 회원인가요?</Text>

          <LoginButton onPress={handleLogin}>
            <Text className="text-white m-auto font-bold">로그인</Text>
          </LoginButton>

          <View className="w-full flex flex-row items-center gap-3 bg-blue-200">
            <View className="  border-b border-b-gray-300 w-1/3" />
            <Text className="color-gray-300">방문이 처음이라면</Text>
            <View className="border-b border-b-gray-300 " />
          </View>

          <SignUpButton onPress={handleSignup}>
            <Text className="text-black m-auto font-bold">회원가입</Text>
          </SignUpButton>
        </View>
      </Container>
    </SafeAreaView>
  );
};

const Container = styled.View`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

const LoginButton = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  background-color: black;
  color: white;
  border-radius: 30px;
`;

const SignUpButton = styled(LoginButton)`
  background-color: white;
  border: 1px solid black;
`;

export default Login;
