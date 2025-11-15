import { View, Text } from "react-native";

export default function ContactScreen() {
  return (
    <View style={{ flex: 1, padding: 24, gap: 12, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>📫 연락처</Text>
      <Text>이메일: hotae0321@naver.com</Text>
      <Text>GitHub: github.com/T1-hotae</Text>
    </View>
  );
}
