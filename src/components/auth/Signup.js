import styled from "@emotion/native";
import { useEffect, useState } from "react";
import { Link, Stack } from "expo-router";
import { View, TextInput, Text, Pressable, Modal } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// function
import { signUpWithFirebase } from "../../common/api/firebase";
import { isEmpty, restrictToNumbers } from "../../common/api/function";

// components
import RegisterInput from "../common/input/RegisterInput";
import { signUpSchema } from "../../common/schema/schema";

const Signup = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [responseData, setResponseData] = useState("");
  const [inputs, setInputs] = useState({
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
  });

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
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

  useEffect(() => {
    console.log("re", responseData);
    if (responseData) {
      setModalText(responseData);
      setIsModalVisible(true);
    }
  }, [responseData]);

  const handleInputChange = (field, value) => {
    console.log(value);
    setInputs((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSignup = () => {
    // field 하나라도 비었을 시 return
    if (isEmpty(inputs)) return;

    // email 형식 검사
    if (!emailRegex.test(inputs.email)) return;
  };

  const handlePhoneNumber = (e) => {};

  const handleOkButton = async () => {
    setIsModalVisible(false);
    setModalText("");
    await setResponseData("");
  };
  const temp = async () => {
    try {
      const data = await signUpWithFirebase("id@naver.com", "12311231");

      setResponseData(data);
    } catch (e) {
      console.error(error);
    }
  };
  console.log(errors.phoneNumber);
  console.log(errors);
  return (
    <>
      <Stack.Screen
        options={{
          // https://reactnavigation.org/docs/headers#setting-the-header-title
          title: "기본 정보 입력",
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: "transparent" },
          headerTintColor: "#000000", // back button color
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
        <View className="w-full flex flex-col items-center">
          {/* 하이픈을 넣어주자 */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <RegisterInput
                value={restrictToNumbers(value)}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={errors.phoneNumber?.message}
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
            render={({ field: { onChange, onBlur, value } }) => (
              <RegisterInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={errors.email?.message}
                label="이메일"
                placeholder="이메일을 입력해주세요."
              />
            )}
            name="email"
          />

          {/* 비밀번호  */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <RegisterInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={errors.password?.message}
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
            render={({ field: { onChange, onBlur, value } }) => (
              <RegisterInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={errors.confirmPassword?.message}
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
            render={({ field: { onChange, onBlur, value } }) => (
              <RegisterInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                errorMessage={errors.nickname?.message}
                label="닉네임"
                placeholder="닉네임을 입력해주세요."
                isLast={true}
              />
            )}
            name="nickname"
          />
        </View>
        <Pressable onPress={temp}>
          <Text>임시버튼</Text>
        </Pressable>
        <Link href="/auth/signup/car" asChild>
          <NextButton
            onPress={handleSubmit(handleSignup)}
            className="w-full h-[60px]"
          >
            <Text className="m-auto text-white font-bold">다음으로</Text>
          </NextButton>
        </Link>
      </Container>
      <Modal animationType="fade" transparent={true} visible={isModalVisible}>
        <View className="bg-cyan-100 w-2/3 h-1/3 p-3  justify-center m-auto">
          <Text>{modalText}</Text>
          <Pressable onPress={handleOkButton}>
            <Text>확인</Text>
          </Pressable>
        </View>
      </Modal>
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
