import { ScrollView } from "react-native";
import RegisterScreen from "../screen/RegisterScreen";
import LoginScreen from "../screen/LoginScreen";
import AppDrawer from "./AppDrawer";
import { useAuth } from "./lib/auth-provider";
import { useState } from "react";

export default function Router() {
  const { isAuthenticated } = useAuth();

  // ✅ 그냥 문자열 초기값
  const [mode, setMode] = useState("login");
  // TS가 아니라면 이걸로 충분합니다.

  if (isAuthenticated) {
    return <AppDrawer />;
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {mode === "login" ? (
        <LoginScreen onGoRegister={() => setMode("register")} />
      ) : (
        <RegisterScreen onGoLogin={() => setMode("login")} />
      )}
    </ScrollView>
  );
}
