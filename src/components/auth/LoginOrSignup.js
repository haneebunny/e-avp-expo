import { View, Text, Image, Dimensions, Pressable } from "react-native";
import styled, { css } from "@emotion/native";
import { Link } from "expo-router";
import Toast from "react-native-toast-message";

const windowHeight = Dimensions.get("window").height;

const LoginOrSignup = () => {
  const handleLogin = () => {
    console.log("로그인 버튼이 클릭되었습니다.");
  };

  const handleSignup = () => {
    console.log("회원가입 버튼이 클릭되었습니다.");
  };

  const showToast = (type) => {
    Toast.show({
      type: type,
      text1: "회원가입 성공",
      text2: "This is some something 👋",
    });
  };

  return (
    <Container>
      <View className="pt-[25%]">
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
        <Text onPress={() => showToast("success")}>성공</Text>
        <Text onPress={() => showToast("error")}>에러</Text>
        <Text onPress={() => showToast("tomatoToast")}>토매로</Text>
        <View className="w-full flex flex-col items-center gap-1.5">
          <View className="w-full flex flex-row items-center gap-3">
            <View className="flex-auto border-b border-b-gray-300" />
            <Text className="color-gray-300">기존 회원인가요?</Text>
            <View className="flex-auto border-b border-b-gray-300" />
          </View>
          <LoginButton onPress={handleLogin} href="/login">
            <Text className="text-white m-auto font-bold">로그인</Text>
          </LoginButton>
        </View>
        <View className="w-full flex flex-col items-center gap-1.5">
          <View className="w-full flex flex-row items-center gap-3">
            <View className="flex-auto border-b border-b-gray-300" />
            <Text className="color-gray-300">방문이 처음이라면</Text>
            <View className="flex-auto border-b border-b-gray-300" />
          </View>
          <Link href="/auth/signup" asChild>
            <SignUpButton>
              <Text className="text-black m-auto font-bold">회원가입</Text>
            </SignUpButton>
          </Link>
        </View>
      </View>
    </Container>
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

const LoginButton = styled.Pressable`
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

export default LoginOrSignup;
