import { Redirect, useRouter } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userInfoState } from "../../common/store/atom";

export default function GlobalSetting() {
  const auth = getAuth();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const router = useRouter();

  console.log(window.location);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, uid } = user;

        setUserInfo({
          accessToken: user.stsTokenManager.accessToken,
          displayName,
          email,
          uid,
        });

        // ...
      } else {
        // 로그아웃
        setUserInfo(null);

        router.replace("/home");
      }
    });
  }, [auth]);

  // useEffect(() => {
  //   if (!userInfo) {
  //     router.replace("/");
  //   }
  // }, [userInfo]);

  return <></>;
}
