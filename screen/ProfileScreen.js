import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { useAuth } from "../lib/AuthContext";
import { useEffect } from "react";

export default function ProfileScreen() {
  //const { user, refreshMe } = useAuth();

  const user = {
    name: "김오조",
    email: "sample@example.com",
    department: "인공지능 전공",
  };
  // useEffect(() => {
  //   refreshMe();
  // }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 24,
        alignItems: "center",
        backgroundColor: "#f9fafb",
        flexGrow: 1,
      }}
    >
      {/* 프로필 카드 */}
      <View
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: 20,
          borderRadius: 16,
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
        }}
      >
        {/* 프로필 이미지 */}
        <Image
          source={require("../assets/profile.png")}
          style={{
            width: 90,
            height: 90,
            borderRadius: 45,
            marginBottom: 16,
          }}
        />

        {/* 이름 / 전공 */}
        <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 4 }}>
          {user.name}
        </Text>
        <Text style={{ fontSize: 14, color: "#6b7280" }}>{user.email}</Text>
        <Text style={{ fontSize: 14, color: "#6b7280" }}>
          {user.department}
        </Text>
      </View>

      {/* 레벨 표시 */}
      <View
        style={{
          marginTop: 30,
          backgroundColor: "white",
          paddingVertical: 14,
          paddingHorizontal: 20,
          borderRadius: 30,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 5,
          elevation: 2,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "600" }}>
          🔥 레벨: <Text style={{ color: "#3b82f6" }}>플래티넘</Text>
        </Text>
      </View>

      {/* 퀴즈 통계 */}
      <View
        style={{
          marginTop: 40,
          width: "100%",
          backgroundColor: "white",
          padding: 20,
          borderRadius: 16,
          shadowColor: "#000",
          shadowOpacity: 0.08,
          shadowRadius: 10,
          elevation: 3,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            퀴즈 맞춘 개수
          </Text>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>오답 개수</Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: "700", color: "#10b981" }}>
            96
          </Text>
          <Text style={{ fontSize: 24, fontWeight: "700", color: "#ef4444" }}>
            12
          </Text>
        </View>
      </View>

      {/* 하단 메뉴 */}
      <View style={{ marginTop: 40, alignItems: "center" }}>
        <TouchableOpacity style={{ marginVertical: 6 }}>
          <Text style={{ color: "#4b5563", fontSize: 14 }}>이용약관</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginVertical: 6 }}>
          <Text style={{ color: "#4b5563", fontSize: 14 }}>고객센터</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
