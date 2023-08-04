import { Redirect } from "expo-router";
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  reactNativeLocalPersistence,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  addDoc,
  deleteDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import Toast from "react-native-toast-message";

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

const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: reactNativeLocalPersistence,
});

// const auth = getAuth();

// 현재 로그인한 사용자 가져오기. 로그인 상태가 아니라면 null
const user = auth.currentUser;

// 이메일 중복확인
export const checkDuplicateEmailWithFirebase = async (email) => {
  try {
    // db 중복 확인
    const q = query(collection(db, "users"), where("email", "==", email));

    const querySnapshot = await getDocs(q);

    return querySnapshot.empty ? false : true;
  } catch (error) {
    console.log("check email", error);
    throw error.message;
  }
};

// 이메일로 회원가입
export const signUpWithFirebase = async (formData) => {
  let isSaved = false;
  try {
    Toast.show({
      type: "default",
      text1: "정보 받아오는 중",
      topOffset: 80,
    });
    // db 저장
    const docRef = await addDoc(collection(db, "users"), {
      email: formData.email,
      password: formData.password,
      nickname: formData.nickname,
      phoneNumber: formData.phoneNumber,
    });

    isSaved = true;

    Toast.show({
      type: "default",
      text1: "회원가입 하는 중",
      topOffset: 80,
    });
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const signUpUser = userCredential.user;

    // 닉네임 설정
    await updateProfile(auth.currentUser, {
      displayName: formData.nickname,
    });

    return signUpUser;
  } catch (error) {
    console.log("회원가입 실패::", error);

    // db 저장이 됐다면 db에서 삭제
    if (isSaved) {
      const q = query(
        collection(db, "users"),
        where("email", "==", formData.email)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        console.log(doc.id, " => ", doc.data());

        // 해당 문서 삭제
        await deleteDoc(doc.ref);
      });
    }

    throw error;
  }
};

// 이메일로 로그인
export const signInWithFirebase = async (formData) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const user = userCredential.user;
    console.log("로그인 성공::", user);
    return user;
  } catch (error) {
    console.log("로그인 실패::", error.message);
    throw error;
  }
};

export const signInAsAdmin = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      "admin@alta.net",
      "admin1231"
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const signOutWithFirebase = async () => {
  try {
    const auth = getAuth();
    console.log(auth);
    const response = await auth.signOut();

    console.log("signOut::", response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
// const updateUserProfile = async () => {
//   updateProfile(auth.currentUser, {
//     displayName: "Jane Q. User",
//     photoURL: "https://example.com/jane-q-user/profile.jpg",
//   })
//     .then(() => {
//       // Profile updated!
//       // ...
//     })
//     .catch((error) => {
//       // An error occurred
//       // ...
//     });

//     try {
//       const updateUser = await updateProfile(user, {
//         displayName: "",
//         phoneNumber: "",
//       })
//     }
// };
