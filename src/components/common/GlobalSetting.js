import { Redirect, useRouter } from "expo-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userInfoState } from "../../common/store/atom";

export default function GlobalSetting() {
  const auth = getAuth();

  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("변화");
      if (user) {
        const { displayName, email, uid } = user;

        setUserInfo({
          accessToken: user.stsTokenManager.accessToken,
          displayName,
          email,
          uid,
        });

        console.log("logfin");

        // ...
      } else {
        // 로그아웃
        console.log("로그아웃");
        setUserInfo(null);

        //
        router.push("/");
      }
    });
  }, []);

  return <></>;
}
