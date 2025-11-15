// ⚠️ 반드시 최상단
import "react-native-gesture-handler";

import { View, KeyboardAvoidingView, Platform } from "react-native";
import { AuthProvider } from "./lib/AuthContext";
import { Router } from "./src/auth";

export default function App() {
  return (
    <>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <AuthProvider>
            <Router />
          </AuthProvider>
        </KeyboardAvoidingView>
      </View>
    </>
  );
}
