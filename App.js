import "react-native-gesture-handler";
import { AuthProvider } from "./src/lib/auth-provider";
import Router from "./src/router";
import { View, KeyboardAvoidingView, Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <AuthProvider>
              <Router />
            </AuthProvider>
          </KeyboardAvoidingView>
        </NavigationContainer>
      </View>
    </>
  );
}
