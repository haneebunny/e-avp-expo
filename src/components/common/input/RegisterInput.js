import styled from "@emotion/native";
import { View, Text, TextInput } from "react-native";

export default function RegisterInput(props) {
  const {
    label = "",
    placeholder = "",
    secure = false,
    type = "default",
    isLast = false,
    isSubmitted = false,
    errorMessage = "",
    inputMode,
    returnKeyType,
    id,
    value,
    onChangeText,
  } = props;

  return (
    <View style={{ marginBottom: isLast ? 0 : 10, width: "100%" }}>
      <View className="p-3 w-full h-[75px] flex flex-col justify-between bg-white border border-gray-400">
        <View className="flex flex-row gap-2">
          <Text className="text-[12px] text-gray-500">{label}</Text>
          <Text
            className={`text-[12px] ${
              isSubmitted ? "text-red-600" : "text-gray-400"
            }`}
          >
            * {errorMessage}
          </Text>
        </View>

        <CustomTextInput
          secureTextEntry={secure}
          placeholder={placeholder}
          keyboardType={type}
          inputMode={inputMode}
          returnKeyType={returnKeyType}
          id={id}
          value={value}
          onChangeText={onChangeText}
          className="text-"
        />
      </View>
    </View>
  );
}

const CustomTextInput = styled.TextInput``;
