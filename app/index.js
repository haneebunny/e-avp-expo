import { Redirect, Stack } from "expo-router";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../src/common/store/atom";
import LoginOrSignup from "../src/components/auth/LoginOrSignup";

export default function DefaultPage() {
  const user = useRecoilValue(userInfoState);

  console.log("main", user);

  console.log();
  // if (user) {
  //   console.log("aoo");
  //   return <Redirect href="/auth" />;
  // }
  return <Redirect href="/home" />;
}
