import styled from "@emotion/native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, ScrollView, Pressable } from "react-native";

import Toast from "react-native-toast-message";

// function
import {
  checkDuplicateEmailWithFirebase,
  signUpWithFirebase,
} from "../../common/api/firebase";
import { restrictToNumbers } from "../../common/api/function";

// components
import RegisterInput from "../common/input/RegisterInput";

// validation
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../common/schema/schema";

const Signup = () => {
  const [responseData, setResponseData] = useState("");

  const router = useRouter();

  const {
    control,
    handleSubmit,
    getValues,
    setFocus,
    formState: { errors, isSubmitted },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      phoneNumber: "",
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
    },
    mode: "onChange",
  });

  // 회원가입 버튼
  const handleSignup = async (formData) => {
    setResponseData("");
    try {
      const response = await signUpWithFirebase(formData);
      setResponseData(response);
      showToast("signupSuccess");
    } catch (error) {
      Toast.show({
        type: "default",
        text1: `${error.message}`,
        topOffset: 80,
      });
    }
  };

  const showToast = (result) => {
    switch (result) {
      case "signupSuccess":
        const formData = getValues();
        Toast.show({
          type: "default",
          text1: `${formData.nickname}님, 회원가입이 완료되었습니다.`,
          topOffset: 80,
        });
        router.push("/login");
        break;

      case "fail":
        console.log("fail");
        break;

      default:
        console.log("??");
        break;
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="h-full">
        <Container>
          <View className="w-full flex flex-col items-center">
            {/* 휴대폰 번호 */}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <RegisterInput
                  value={restrictToNumbers(value)}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors.phoneNumber?.message}
                  isSubmitted={isSubmitted}
                  onSubmitEditing={() => {
                    setFocus("email");
                  }} // next 누르면 email 로 focus 이동
                  label="휴대폰 번호"
                  placeholder="휴대폰 번호를 입력해주세요."
                  type="number-pad"
                />
              )}
              name="phoneNumber"
            />
            {/* 아이디 중복확인 */}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <RegisterInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors.email?.message}
                  isSubmitted={isSubmitted}
                  ref={ref}
                  onSubmitEditing={() => {
                    setFocus("password");
                  }}
                  label="이메일"
                  placeholder="이메일을 입력해주세요."
                  inputMode="email"
                />
              )}
              name="email"
            />
            {/* 비밀번호  */}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <RegisterInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors.password?.message}
                  isSubmitted={isSubmitted}
                  ref={ref}
                  onSubmitEditing={() => {
                    setFocus("confirmPassword");
                  }}
                  label="비밀번호"
                  placeholder="영문, 숫자 포함 최소 8자"
                  secure={true}
                />
              )}
              name="password"
            />
            {/* 비밀번호 확인 */}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <RegisterInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors.confirmPassword?.message}
                  isSubmitted={isSubmitted}
                  ref={ref}
                  onSubmitEditing={() => {
                    setFocus("nickname");
                  }}
                  label="비밀번호 확인"
                  placeholder="비밀번호를 다시 한 번 입력해주세요."
                  secure={true}
                />
              )}
              name="confirmPassword"
            />

            {/* 닉네임 중복확인 */}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <RegisterInput
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  errorMessage={errors.nickname?.message}
                  isSubmitted={isSubmitted}
                  ref={ref}
                  label="닉네임"
                  placeholder="한글, 영문 포함 최대 8자"
                  isLast={true}
                  returnKeyType="done"
                />
              )}
              name="nickname"
            />
          </View>

          <SignupButton onPress={handleSubmit(handleSignup)}>
            <Text className="m-auto text-white font-bold">회원가입</Text>
          </SignupButton>
        </Container>
      </ScrollView>
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
  flex: 1;
`;

const SignupButton = styled.Pressable`
  width: 100%;
  height: 60px;
  background-color: #0c55fa;
  border-radius: 30px;
`;

export default Signup;
