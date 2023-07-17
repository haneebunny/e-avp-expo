import styled from "@emotion/native";
import { View, Text, TextInput } from "react-native";

export default function RegisterInput(props) {
  const {
    name = "",
    placeholder = "",
    secure = false,
    type = "default",
    id,
    value,
    onChangeText,
  } = props;

  return (
    <>
      <View className="p-3 w-full h-[75px] flex flex-col justify-between bg-white border border-gray-400">
        <Text className="text-[12px] text-gray-500">{name}</Text>
        <CustomTextInput
          secureTextEntry={secure}
          placeholder={placeholder}
          keyboardType={type}
          id={id}
          value={value}
          onChangeText={onChangeText}
          className="text-"
        />
      </View>
    </>
  );
}

const CustomTextInput = styled.TextInput``;
