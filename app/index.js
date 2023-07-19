import { Link } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";

export default function DefaultPage() {
  return (
    <View>
      <Text className="font-bold text-blue-500">Home page </Text>
      <Link href="/auth/login-or-signup">로그인/회원가입 화면</Link>
      <Link href="/monit">모니터링 화면</Link>
    </View>
  );
}
