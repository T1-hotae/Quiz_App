import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  // 웹에서 쓸 수도 있는 다른 것들...
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

const firebaseConfig = {
  apiKey: "AIzaSyBXRU7ccncPbD_z4K9CHmvk0VP4ukspVEc",
  authDomain: "aiquiz-79b53.firebaseapp.com",
  projectId: "aiquiz-79b53",
  storageBucket: "aiquiz-79b53.firebasestorage.app",
  messagingSenderId: "838901225280",
  appId: "1:838901225280:web:2e113f7fe09b5b111ccca5",
  measurementId: "G-ZDFC8ZNJYH",
};

const app = initializeApp(firebaseConfig);

let auth;

if (Platform.OS === "web") {
  auth = getAuth(app);
} else {
  const { getReactNativePersistence } = require("firebase/auth");
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { app, auth };

// Firestore는 공통
export const db = getFirestore(app);
