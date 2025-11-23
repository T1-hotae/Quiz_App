import { useEffect } from "react";
import { View, Text } from "react-native";
import { useAuth } from "../src/lib/auth-provider";

export default function LogoutScreen() {
  const { signOut } = useAuth();

  useEffect(() => {
    signOut();
  }, []);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>로그아웃 중...</Text>
    </View>
  );
}
