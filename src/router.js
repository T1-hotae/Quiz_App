import { ScrollView } from "react-native";
import RegisterScreen from "../screen/RegisterScreen";
import LoginScreen from "../screen/LoginScreen";
import AppDrawer from "./AppDrawer";

export default function Router() {
  const { isAuthenticated } = useAuth();
  const [mode, setMode] = (useState < "login") | ("register" > "login");

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
