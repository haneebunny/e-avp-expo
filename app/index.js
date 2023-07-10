import { Link } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Constants from "expo-constants";

export default function Page() {
  return (
    <SafeAreaView style={{ paddingTop: Constants.statusBarHeight }}>
      <View>
        <Text className="font-bold text-blue-500">Home page</Text>
        <Link href="/login">로그인 화면</Link>
      </View>
    </SafeAreaView>
  );
}
