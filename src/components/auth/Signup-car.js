import styled from "@emotion/native";
import { Stack } from "expo-router";
import { useState } from "react";
import { View, TextInput, Text } from "react-native";
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
          title: "차량 정보 등록",
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
      <View className="bg-slate-500">
        <View></View>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <RegisterInput />
        <NextButton onPress={handleSignup} className="w-full h-[60px]">
          <Text className="m-auto text-white font-bold">다음으로</Text>
        </NextButton>
      </View>
    </>
  );
};

const NextButton = styled.Pressable`
  width: 100%;
  height: 60px;
  background-color: #0c55fa;
  border-radius: 30px;
`;

export default SignupCar;
