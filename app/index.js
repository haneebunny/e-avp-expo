import {
  Redirect,
  Stack,
  useRootNavigationState,
  useRouter,
} from "expo-router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import useAuth from "../src/common/hooks/auth";
import { userInfoState } from "../src/common/store/atom";
import LoginOrSignup from "../src/components/auth/LoginOrSignup";
import UserInfo from "../src/components/auth/UserInfo";

function LoadingRoot() {
  const rootNavigationState = useRootNavigationState();
  console.log(rootNavigationState);

  if (!rootNavigationState?.key) return null;
}

export default function DefaultPage() {
  // const rootNavigationState = useRootNavigationState();

  const user = useRecoilValue(userInfoState);

  // if (rootNavigationState?.key) {
  //   const router = useRouter();

  //   if (!user) {
  //     router.replace("/auth");
  //   }
  // }

  // useEffect(() => {
  //   if (!user) {
  //     router.replace("/auth");
  //   }
  // }, [user]);

  // LoadingRoot();

  if (user) {
    return <Redirect href="/(auth)" />;
  }
  return (
    <>
      <Stack.Screen
        options={{
          // ...options,
          headerShown: false,
        }}
      />
      <LoginOrSignup />
    </>
  );
}
