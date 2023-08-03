import styled from "@emotion/native";
import { Stack, Link } from "expo-router";
import { useState } from "react";
import { View, TextInput, Text, Pressable } from "react-native";
import RegisterInput from "../common/input/RegisterInput";

const SignupCar = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    // 회원가입 로직 구현
  };

  return (
    <>
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "차량 정보 입력",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: "transparent" },
          headerTintColor: "#000000", // back button style
          headerTitleStyle: {
            fontWeight: "bold",
            color: "#6D6D70", // "My home" text color
          },
          headerTitleAlign: "center",
          headerBackTitleStyle: {
            color: "black", // 모르겠음ㅎ
          },
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
        }}
      />
      <Container>
        <View className="w-full flex flex-col items-center ">
          <RegisterInput name="차량 종류" placeholder="차종 입력" />
          <RegisterInput name="차량 번호" placeholder="차량 번호를 입력" />
          <RegisterInput
            name="닉네임"
            placeholder="한글, 영문만 사용, 최대 8자"
          />
          <Pressable>
            <Text>아하.</Text>
          </Pressable>
        </View>
        <Link href="/signup/car" asChild>
          <NextButton onPress={handleSignup} className="w-full h-[60px]">
            <Text className="m-auto text-white font-bold">등록하기</Text>
          </NextButton>
        </Link>
      </Container>
    </>
  );
};

const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 40px 30px 40px;
`;

const NextButton = styled.Pressable`
  width: 100%;
  height: 60px;
  background-color: #0c55fa;
  border-radius: 30px;
`;

export default SignupCar;
