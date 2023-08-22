import styled from "@emotion/native";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  Dimensions,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { color } from "../../../config/color";
import { signInAsAdmin, signInWithFirebase } from "../../common/api/firebase";
import { signInSchema } from "../../common/schema/schema";
import Toast from "react-native-toast-message";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../common/store/atom";

const windowHeight = Dimensions.get("window").height;

export default function Login() {
  const router = useRouter();

  const [userInfo, serUserInfo] = useRecoilState(userInfoState);

  const {
    control,
    handleSubmit,
    getValues,
    setError,
    setFocus,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  const handleSignIn = async (formData) => {
    try {
      const response = await signInWithFirebase(formData);
      console.log(response);
      showToast();
      router.replace("/");
    } catch (error) {
      setError("email", {
        type: "custom",
        message: "이메일이나 비밀번호를 잘못 입력했습니다.",
      });
    }
  };

  const handleAdminSignIn = async () => {
    try {
      await signInAsAdmin();

      Toast.show({
        type: "default",
        text1: "로그인 되었습니다.",
        topOffset: 80,
      });
      router.replace("/home");
    } catch (error) {
      console.log(error);
      setError("email", {
        type: "custom",
        message: "관리자 로그인이 불가능 합니다.",
      });
    }
  };
  const showToast = () => {
    const formData = getValues();
    Toast.show({
      type: "default",
      text1: `${formData.nickname}님, 환영합니다.`,
      show: true,
      topOffset: 80,
    });
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="h-full">
        <Container>
          <View className="h-2/5 mt-5 flex justify-center">
            <Image
              source={require("assets/img/home-logo.png")}
              // className="w-{300}"
              style={{
                resizeMode: "contain",
                width: 280,
              }}
            />
          </View>
          <View className="w-full flex items-center gap-3">
            <Pressable
              onPress={handleAdminSignIn}
              className="w-28 h-10 bg-lime-400 self-end rounded-3xl p-2"
            >
              <Text className="text-white m-auto font-bold">관리자 로그인</Text>
            </Pressable>
            <View className="w-full flex flex-col items-center gap-y-5">
              <View className="w-full flex flex-col items-center">
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <LoginInput
                      placeholder="이메일을 입력하세요."
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      inputMode="email"
                      autoComplete="email"
                      returnKeyType="next"
                      selectionColor="pink"
                      className="mb-2"
                      onSubmitEditing={() => {
                        setFocus("password");
                      }}
                    />
                  )}
                  name="email"
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <LoginInput
                      value={value}
                      onChangeText={onChange}
                      onBlur={onBlur}
                      secureTextEntry={true}
                      ref={ref}
                      placeholder="비밀번호를 입력하세요."
                      returnKeyType="done"
                    />
                  )}
                  name="password"
                />
              </View>
              <Text className="text-red-600 text-[13px]">
                {errors.email?.message || errors.password?.message}
              </Text>

              <LoginButton onPress={handleSubmit(handleSignIn)}>
                <Text className="text-white m-auto font-bold">로그인</Text>
              </LoginButton>
            </View>
          </View>
        </Container>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const Container = styled.View`
  width: 100%;
  height: ${windowHeight};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 40px 30px 40px;
  flex: 1;
`;

const LoginInput = styled.TextInput`
  width: 100%;
  height: 60px;
  background-color: white;
  border-radius: 30px;
  border: 1px solid ${color.gray[300]};
  padding: 0px 25px 0px 25px;
`;

const LoginButton = styled.Pressable`
  width: 100%;
  height: 60px;
  background-color: ${color.blue};
  color: white;
  border-radius: 30px;
`;
