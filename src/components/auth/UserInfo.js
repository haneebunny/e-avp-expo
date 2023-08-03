import { View, Text, Pressable } from "react-native";
import { useRecoilState } from "recoil";
import { userInfoState } from "../../common/store/atom";

const engToKo = {
  displayName: "닉네임",
  email: "이메일",
  phoneNumber: "휴대폰 번호",
};

export default function UserInfo() {
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  return (
    <View className="items-center">
      <View className="w-2/3">
        <InfoBox label="닉네임" value={userInfo?.displayName} />
        <InfoBox label="이메일" value={userInfo?.email} />
        <InfoBox label="휴대폰 번호" value={userInfo?.phoneNumber} />
      </View>

      <Pressable>
        <Text>로그아웃</Text>
      </Pressable>
      <Pressable>
        <Text>모니터링 화면</Text>
      </Pressable>
    </View>
  );
}

function InfoBox({ label, value }) {
  return (
    <View className="w-full p-3">
      <View>
        <Text className="font-bold">{label}</Text>
        {value ? (
          <View className="p-3 border border-blue-400 rounded-xl">
            <Text>{value}</Text>
          </View>
        ) : (
          <View>
            <Text>휴대폰 번호 없음</Text>
          </View>
        )}
      </View>
    </View>
  );
}
