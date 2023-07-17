import styled from "@emotion/native";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import { View, TextInput, Text } from "react-native";
import RegisterInput from "../common/input/RegisterInput";

const Signup = () => {
  const [inputs, setInputs] = useState({
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const handleInputChange = (e) => {
    console.log(e);
    // setInputs((prevData) => ({
    //   ...prevData,
    //   [e.target.id]: e.target.value,
    // }));
  };

  const handleSignup = () => {
    // 회원가입 로직 구현
  };

  const handlePhoneNumber = (e) => {};
  return (
    <>
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "기본 정보 입력",
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
          {/* 하이픈을 넣어주자 */}
          <RegisterInput
            id="phoneNumber"
            value={inputs.phoneNumber}
            onChangeText={handleInputChange}
            name="휴대폰 번호"
            placeholder="휴대폰 번호 입력"
            type="number-pad"
          />
          {/* 아이디 중복확인 */}
          <RegisterInput name="아이디" placeholder="아이디 입력" />
          <RegisterInput
            name="비밀번호"
            placeholder="영문, 숫자 포함, 최소 8자"
            secure={true}
          />
          <RegisterInput
            name="비밀번호 확인"
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            secure={true}
          />
          {/* 닉네임 중복확인 */}
          <RegisterInput
            name="닉네임"
            placeholder="한글, 영문만 사용, 최대8자"
          />
        </View>

        <Link href="/auth/signup/car" asChild>
          <NextButton onPress={handleSignup} className="w-full h-[60px]">
            <Text className="m-auto text-white font-bold">다음으로</Text>
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

export default Signup;
