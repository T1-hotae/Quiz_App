import { createContext, useContext, useReducer, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE = "http://10.0.2.2:9000";

const AuthContext = createContext(null);

async function apiPost(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  let data = null;
  try {
    data = await res.json();
  } catch {
    // 응답 body가 비어있을 수도 있어서 조용히 무시
  }

  if (!res.ok) {
    const msg = data?.detail || data?.message || "요청 실패";
    const error = new Error(msg);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

async function apiGetAuth(path, token) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let data = null;
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) {
    const msg = data?.detail || data?.message || "요청 실패";
    const error = new Error(msg);
    error.status = res.status;
    error.data = data;
    throw error;
  }

  return data;
}

export function useAuth() {
  return useContext(AuthContext);
}

const initialState = {
  loading: false,
  user: null,
  token: null,
  error: "",
};

function authReducer(state, action) {
  switch (action.type) {
    case "START":
      return { ...state, loading: true, error: "" };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.user,
        token: action.token,
        error: "",
      };
    case "FAIL":
      return { ...state, loading: false, error: action.message };
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // ⭐ 앱 실행 시 토큰 가져와 자동 로그인 처리
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("token");
      const user = await AsyncStorage.getItem("user");

      if (token && user) {
        dispatch({
          type: "SUCCESS",
          token,
          user: JSON.parse(user),
        });
      }
    })();
  }, []);

  // ⭐ 회원가입
  const signUp = async ({ email, password, name, department }) => {
    dispatch({ type: "START" });

    try {
      await apiPost("/auth/register", { email, password, name, department });

      // 가입 후 자동 로그인
      await signIn({ email, password });
    } catch (e) {
      console.log("🔥 signUp error:", e);
      dispatch({
        type: "FAIL",
        message: e.message || "회원가입 실패",
      });
      throw e;
    }
  };

  // ⭐ 로그인
  const signIn = async ({ email, password }) => {
    dispatch({ type: "START" });

    try {
      const data = await apiPost("/auth/login", { email, password });

      const user = data.user;
      const token = data.access_token;

      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));

      dispatch({ type: "SUCCESS", user, token });
    } catch (e) {
      dispatch({
        type: "FAIL",
        message: e.message || "로그인 실패",
      });
      throw e;
    }
  };

  // ⭐ 로그아웃
  const signOut = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const refreshMe = async () => {
    if (!state.token) return;
    try {
      const me = await apiGetAuth("/auth/me", state.token);
      // me: { id, email, name, department }
      await AsyncStorage.setItem("user", JSON.stringify(me));
      dispatch({ type: "SUCCESS", user: me, token: state.token });
    } catch (e) {
      console.log("❌ refreshMe error:", e);
      // 필요하면 여기서 토큰 만료 시 signOut 같은 처리 가능
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        isAuthenticated: !!state.token,
        signUp,
        signIn,
        signOut,
        refreshMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
