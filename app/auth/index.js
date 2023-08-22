import { Redirect, Stack, useRouter } from "expo-router";
import UserInfo from "../../src/components/auth/UserInfo";
import { options } from "../../config/stack";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../src/common/store/atom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function AuthPage() {
  const user = useRecoilValue(userInfoState);

  const router = useRouter();

  const auth = getAuth();
  console.log("rrr");
  console.log("!user", user);

  //   if (!user) {
  //     router.replace("/");
  //   }

  return (
    <>
      <Stack.Screen
        options={{
          ...options,
          title: "회원 정보",
          contentStyle: {
            backgroundColor: "#e6ebee",
          },
        }}
      />

      <UserInfo />
    </>
  );
}
