import { Link } from "expo-router";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";

export default function Page() {
  return (
    <SafeAreaView>
      <View>
        <Text className="font-bold text-blue-500">Home page dasdasdasd</Text>
        <Link href="/login">
          <TouchableOpacity>
            <Text>HIIII</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}
