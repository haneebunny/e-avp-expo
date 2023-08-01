import { View, Text, Image, Dimensions, Pressable } from "react-native";
import styled from "@emotion/native";
import { Link } from "expo-router";
import Toast from "react-native-toast-message";

const LoginOrSignup = () => {
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
        <View className="w-full flex flex-col items-center gap-1.5">
          <View className="w-full flex flex-row items-center gap-3">
            <View className="flex-auto border-b border-b-gray-300" />
            <Text className="color-gray-300">기존 회원인가요?</Text>
            <View className="flex-auto border-b border-b-gray-300" />
          </View>
          <Link href="/auth/login" asChild>
            <LoginButton>
              <Text className="text-white m-auto font-bold">로그인</Text>
            </LoginButton>
          </Link>
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
