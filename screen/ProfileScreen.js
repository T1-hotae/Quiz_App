import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../src/lib/auth-provider";
import { db } from "../src/Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProfileScreen() {
  const { user } = useAuth(); // 🔹 Firebase Auth 사용자 (uid, email 등)
  const [profile, setProfile] = useState(null); // Firestore 프로필
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ProfileScreen user:", user);
    console.log("ProfileScreen db:", db);

    // 로그인 안 돼 있으면 그냥 끝
    if (!user) {
      setLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const ref = doc(db, "users", user.uid); // users/{uid}
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setProfile(snap.data());
        } else {
          // 혹시 문서가 없으면 기본값
          setProfile({
            name: user.displayName || "",
            email: user.email || "",
            department: "",
          });
        }
      } catch (e) {
        console.log("프로필 불러오기 오류:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  if (!user) {
    // 로그인 안 된 상태에서 접근한 경우
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9fafb",
        }}
      >
        <Text>로그인이 필요합니다.</Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f9fafb",
        }}
      >
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  // 🔹 표시에 사용할 값들 (Firestore 값이 우선, 없으면 Auth 값)
  const name = profile?.name || user.displayName || "이름 미설정";
  const email = profile?.email || user.email || "이메일 미설정";
  const department = profile?.department || "학과 정보 미설정";

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
          {name}
        </Text>
        <Text style={{ fontSize: 14, color: "#6b7280" }}>{email}</Text>
        <Text style={{ fontSize: 14, color: "#6b7280" }}>{department}</Text>
      </View>

      {/* 레벨 표시 (지금은 더미 값) */}
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

      {/* 퀴즈 통계 (이 부분은 나중에 Firestore/백엔드 연동) */}
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
