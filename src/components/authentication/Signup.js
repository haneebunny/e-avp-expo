import React from "react";
import { View, TextInput, Button } from "react-native";

const Signup = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSignup = () => {
    // 회원가입 로직 구현
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Signup" onPress={handleSignup} />
    </View>
  );
};

export default Signup;
