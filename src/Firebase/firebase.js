// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  // React Native에서 세션 유지까지 하고 싶을 때
  initializeAuth,
  getReactNativePersistence,
  // getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBXRU7ccncPbD_z4K9CHmvk0VP4ukspVEc",
  authDomain: "aiquiz-79b53.firebaseapp.com",
  projectId: "aiquiz-79b53",
  storageBucket: "aiquiz-79b53.firebasestorage.app",
  messagingSenderId: "838901225280",
  appId: "1:838901225280:web:2e113f7fe09b5b111ccca5",
  measurementId: "G-ZDFC8ZNJYH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// React Native용 Auth 초기화 + AsyncStorage로 세션 유지
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// 🗂 프로필 저장용 Firestore
export const db = getFirestore(app);

export default app;
