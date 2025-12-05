import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
} from "firebase/auth";
import { auth, db } from "../../services/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // 버튼 로딩
  const [error, setError] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser);
      setInitializing(false);
    });
    return unsub;
  }, []);

  const signIn = async ({ email, password }) => {
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      console.log("signIn error:", e);
      setError("이메일 또는 비밀번호를 다시 확인해주세요.");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  // 🔥 회원가입: Auth + Firestore 프로필 저장
  const signUp = async ({ email, password, name, department }) => {
    setLoading(true);
    setError(null);
    try {
      // 1) Firebase Auth에 계정 생성
      const cred = await createUserWithEmailAndPassword(auth, email, password);

      // 2) Firestore에 프로필 정보 저장
      await setDoc(doc(db, "users", cred.user.uid), {
        email,
        name,
        department,
        createdAt: serverTimestamp(),
      });
    } catch (e) {
      setError("회원가입 중 오류가 발생했습니다.");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    await fbSignOut(auth);
  };

  const value = {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    isAuthenticated: !!user,
  };

  if (initializing) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth는 AuthProvider 안에서만 사용해야 합니다.");
  return ctx;
}
