// ⚠️ 반드시 최상단
import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useState,
  useEffect,
} from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  ScrollView,
  Image,
  StyleSheet,
} from "react-native";

import AboutScreen from "../screen/AboutScreen";
import MainTabs from "../tab/MainTabs";

async function fakeSignIn({ email, password }) {
  await new Promise((r) => setTimeout(r, 600));
  if (!/.+@.+\..+/.test(String(email || "").trim()))
    throw new Error("올바른 이메일 형식이 아닙니다.");
  if (String(password || "").length < 6)
    throw new Error("비밀번호는 6자 이상이어야 합니다.");
  if (
    String(email).toLowerCase() !== "hotae0321@naver.com" ||
    password !== "ghxo2002"
  )
    throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
  return {
    token: "demo-token",
    user: { id: "u1", name: "Hotae Zzang", email: String(email).toLowerCase() },
  };
}

const AuthContext = createContext(null);

const initialAuth = { loading: false, error: "", user: null, token: null };
function authReducer(state, action) {
  switch (action.type) {
    case "SIGNIN_START":
      return { ...state, loading: true, error: "" };
    case "SIGNIN_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.user,
        token: action.token,
        error: "",
      };
    case "SIGNIN_FAIL":
      return {
        ...state,
        loading: false,
        error: action.message || "로그인 실패",
      };
    case "SIGNOUT":
      return { ...state, user: null, token: null, error: "" };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuth);

  const signIn = async ({ email, password }) => {
    dispatch({ type: "SIGNIN_START" });
    try {
      const res = await fakeSignIn({ email, password });
      // 🔐 실서비스에서는 여기서 토큰을 AsyncStorage 등에 저장하세요
      // await AsyncStorage.setItem('token', res.token);
      dispatch({ type: "SIGNIN_SUCCESS", user: res.user, token: res.token });
      return res;
    } catch (e) {
      dispatch({
        type: "SIGNIN_FAIL",
        message: e && e.message ? e.message : "로그인 실패",
      });
      throw e;
    }
  };

  const signOut = async () => {
    // 🔐 실서비스에서는 저장된 토큰/유저도 함께 삭제하세요
    // await AsyncStorage.multiRemove(['token','user']);
    dispatch({ type: "SIGNOUT" });
  };

  const value = useMemo(
    () => ({
      loading: state.loading,
      error: state.error,
      user: state.user,
      token: state.token,
      isAuthenticated: !!state.token,
      signIn,
      signOut,
    }),
    [state.loading, state.error, state.user, state.token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth는 AuthProvider 내부에서만 사용하세요");
  return ctx;
}

export function LoginScreen() {
  const { signIn, loading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [secure, setSecure] = useState(true);

  const emailErr =
    touched.email && !/.+@.+\..+/.test(email)
      ? "올바른 이메일 형식이 아닙니다."
      : "";
  const passErr =
    touched.password && password.length < 6
      ? "비밀번호는 6자 이상이어야 합니다."
      : "";
  const canSubmit = /.+@.+\..+/.test(email) && password.length >= 6 && !loading;

  const submit = async () => {
    setTouched({ email: true, password: true });
    if (!canSubmit) return;
    try {
      await signIn({ email: email.trim(), password });
    } catch (_) {
      // 에러는 Context의 error로 표시
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <View style={{ alignItems: "center" }}>
        <Image source={require("../assets/1024.png")} style={styles.logo} />
      </View>
      <Text
        style={{
          color: "#111827",
          fontSize: 26,
          fontWeight: "800",
          marginBottom: 16,
        }}
      >
        로그인
      </Text>

      <Text style={{ marginBottom: 6 }}>이메일</Text>
      <TextInput
        testID="input-email"
        value={email}
        onChangeText={setEmail}
        onBlur={() => setTouched((t) => ({ ...t, email: true }))}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="이메일을 입력하세요."
        style={{
          height: 48,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: emailErr ? "#f59e0b" : "#d1d5db",
          paddingHorizontal: 12,
          marginBottom: 4,
        }}
      />
      {emailErr ? (
        <Text style={{ color: "#b45309", marginBottom: 8 }}>{emailErr}</Text>
      ) : null}

      <Text style={{ marginBottom: 6, marginTop: 8 }}>비밀번호</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: passErr ? "#f59e0b" : "#d1d5db",
          borderRadius: 10,
          height: 48,
          paddingHorizontal: 12,
          marginBottom: 4,
        }}
      >
        <TextInput
          testID="input-password"
          value={password}
          onChangeText={setPassword}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          secureTextEntry={secure}
          placeholder="비밀번호"
          style={{ flex: 1 }}
        />
        <Pressable onPress={() => setSecure((s) => !s)} hitSlop={8}>
          <Text style={{ color: "#2563eb", fontWeight: "700" }}>
            {secure ? "보기" : "숨기기"}
          </Text>
        </Pressable>
      </View>
      {passErr ? (
        <Text style={{ color: "#b45309", marginBottom: 8 }}>{passErr}</Text>
      ) : null}

      {error ? (
        <Text
          testID="text-error"
          style={{ color: "#dc2626", marginTop: 6, marginBottom: 8 }}
        >
          {error}
        </Text>
      ) : null}

      <Pressable
        testID="btn-submit"
        onPress={submit}
        disabled={!canSubmit}
        style={{
          height: 48,
          borderRadius: 12,
          backgroundColor: canSubmit ? "#4f46e5" : "#9ca3af",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 8,
        }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontWeight: "700" }}>로그인</Text>
        )}
      </Pressable>
    </View>
  );
}

export function LogoutScreen() {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut(); // 🔥 화면 들어오자마자 로그아웃 실행
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>로그아웃 중...</Text>
    </View>
  );
}

export function Router() {
  const { isAuthenticated } = useAuth();
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {isAuthenticated ? <HomeScreen /> : <LoginScreen />}
    </ScrollView>
  );
}

const Drawer = createDrawerNavigator();

export function HomeScreen() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={MainTabs}
          options={{ title: "홈" }}
        />

        <Drawer.Screen
          name="logout"
          component={LogoutScreen}
          options={{ title: "로그아웃" }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

/** ✅ 스타일 정의 */
const styles = StyleSheet.create({
  logo: {
    width: 160,
    height: 160,
    borderRadius: 15,
    marginBottom: 100,
    marginTop: -50,
  },
});
