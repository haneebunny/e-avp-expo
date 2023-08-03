import { useRootNavigationState, useRouter } from "expo-router";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import { userInfoState } from "../store/atom";

export default function useAuth() {
  const rootNavigationState = useRootNavigationState();
  const user = useRecoilValue(userInfoState);
  const router = useRouter();

  // rootNavigationState의 key가 있는지 체크하여
  // 최상위 네비게이션 컴포넌트인지 확인합니다.

  // 인증 여부에 따라 적절한 경로로 네비게이션을 처리합니다.
  console.log("QQQ");

  if (!user) {
    router.replace("/");
  } else {
    router.replace("/(auth)");
  }

  // 이 hook은 주로 네비게이션 처리를 위해 사용되므로
  // 여기에서는 반환값을 필요로 하지 않습니다.
  // 만약 컴포넌트 내에서 인증 여부를 확인해야 한다면,
  // 해당 컴포넌트에서 useRecoilValue(userInfoState)를 직접 사용하시면 됩니다.
}
