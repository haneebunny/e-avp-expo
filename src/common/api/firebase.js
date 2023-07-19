import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  reactNativeLocalPersistence,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDZLvvAhWzwOyNaCHukMjN1jet5N9Pl18",
  authDomain: "e-avp-expo.firebaseapp.com",
  projectId: "e-avp-expo",
  storageBucket: "e-avp-expo.appspot.com",
  messagingSenderId: "475099246884",
  appId: "1:475099246884:web:6ee7b7cd69175723ec03b1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: reactNativeLocalPersistence,
});

const auth = getAuth();

export const signUpWithFirebase = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("회원가입::", user);
    // user.displayName = dmdmdmdkdkdkd
    return user;
  } catch (error) {
    const errorMessage = error.message;
    console.log("회원가입 실패::", errorMessage);
    return errorMessage;
  }
};

// 로그인
export const signInWithFirebase = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      console.log("로그인::", user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log("로그인 실패::", errorMessage);
    });
};
