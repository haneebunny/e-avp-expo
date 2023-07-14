import styled from "@emotion/native";
import { View, Text, TextInput } from "react-native";

export default function RegisterInput() {
  return (
    <>
      <View className="p-3 w-full h-[75px] flex flex-col justify-between bg-white border border-gray-400">
        <Text className="text-[12px] text-gray-500">휴대폰 번호</Text>
        <CustomTextInput
          placeholder="한글, 영문만 사용, 최대 8자"
          className="text-"
        />
      </View>
    </>
  );
}

const CustomTextInput = styled.TextInput``;
