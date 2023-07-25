import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function DefaultPage() {
  console.log("defaultPage");
  return (
    <View className="h-full">
      <View className="m-auto flex flex-row">
        <View className="w-1/3 h-20">
          <Link className="bg-indigo-400 h-20" href="/auth/login-or-signup">
            로그인/회원가입
          </Link>
        </View>
        <View className="w-1/3 h-20">
          <Link className="bg-amber-300 h-20" href="/monit">
            모니터링
          </Link>
        </View>
      </View>
    </View>
  );
}
