import styled from "@emotion/native";
import { useEffect, useState } from "react";
import { View, TextInput, Text, Pressable } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Toast from "react-native-toast-message";

// function
import { signUpWithFirebase } from "../../common/api/firebase";
import { restrictToNumbers } from "../../common/api/function";

// components
import RegisterInput from "../common/input/RegisterInput";
import { signUpSchema } from "../../common/schema/schema";

const Signup = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [responseData, setResponseData] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
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
    if (responseData) {
      setModalText(responseData);
      setIsModalVisible(true);
    }
  }, [responseData]);

  const handleSignup = async (formData) => {
    showToast("success");

    try {
      const response = await signUpWithFirebase(formData);
      console.log("response", response);
      setResponseData(response);
    } catch (e) {
      console.error(error);
      setResponseData(error.message);
    }
  };

  const handlePhoneNumber = (e) => {};

  const showToast = (type) => {
    const formData = getValues();
    Toast.show({
      type: type,
      text1: `${formData.nickname}님, 회원가입이 완료되었습니다.`,
      text2: `${formData.nickname}님, 회원가입이 완료되었습니다.`,
      show: true,
      topOffset: 80,
    });
  };

  // Modal Ok Button
  const handleOkButton = async () => {
    setIsModalVisible(false);
    setModalText("");
    await setResponseData("");
  };

  return (
    <>
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
                inputMode="email"
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
                placeholder="한글, 영문 포함 최대 8자"
                isLast={true}
              />
            )}
            name="nickname"
          />
        </View>

        {/* <Link href="/auth/signup/car" asChild> */}
        <SignupButton
          // onPress={handleSubmit(handleSignup)}
          onPress={() => showToast("tomatoToast")}
        >
          <Text className="m-auto text-white font-bold">회원가입</Text>
        </SignupButton>
        {/* </Link> */}
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

const SignupButton = styled.Pressable`
  width: 100%;
  height: 60px;
  background-color: #0c55fa;
  border-radius: 30px;
`;

export default Signup;
