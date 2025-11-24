import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../src/lib/auth-provider";
import { db } from "../src/Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProfileScreen() {
  const { user } = useAuth(); // 🔹 Firebase Auth 사용자 (uid, email 등)
  const [profile, setProfile] = useState(null); // Firestore 프로필
  const [loading, setLoading] = useState(true);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const BG = isDark ? "#020617" : "#f9fafb";
  const CARD_BG = isDark ? "#0b1120" : "#ffffff";
  const TEXT_PRIMARY = isDark ? "#e5e7eb" : "#111827";
  const TEXT_SECONDARY = isDark ? "#9ca3af" : "#6b7280";
  const BORDER_SOFT = isDark ? "#1f2937" : "#e5e7eb";

  useEffect(() => {
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
          backgroundColor: BG,
        }}
      >
        <Text style={{ color: TEXT_PRIMARY }}>로그인이 필요합니다.</Text>
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
          backgroundColor: BG,
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
        backgroundColor: BG,
        flexGrow: 1,
      }}
    >
      {/* 프로필 카드 */}
      <View
        style={{
          width: "100%",
          backgroundColor: CARD_BG,
          padding: 20,
          borderRadius: 16,
          alignItems: "center",
          shadowColor: "#000",
          shadowOpacity: isDark ? 0.4 : 0.08,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 4 },
          elevation: 3,
          borderWidth: 1,
          borderColor: BORDER_SOFT,
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
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 4,
            color: TEXT_PRIMARY,
          }}
        >
          {name}
        </Text>
        <Text style={{ fontSize: 14, color: TEXT_SECONDARY }}>{email}</Text>
        <Text style={{ fontSize: 14, color: TEXT_SECONDARY }}>
          {department}
        </Text>
      </View>

      {/* 레벨 표시 (지금은 더미 값) */}
      <View
        style={{
          marginTop: 30,
          backgroundColor: CARD_BG,
          paddingVertical: 14,
          paddingHorizontal: 20,
          borderRadius: 30,
          shadowColor: "#000",
          shadowOpacity: isDark ? 0.4 : 0.05,
          shadowRadius: 5,
          elevation: 2,
          borderWidth: 1,
          borderColor: BORDER_SOFT,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "600",
            color: TEXT_PRIMARY,
          }}
        >
          🔥 레벨:{" "}
          <Text style={{ color: "#3b82f6" /* 파란색은 그대로 가도 이쁨 */ }}>
            플래티넘
          </Text>
        </Text>
      </View>

      {/* 퀴즈 통계 */}
      <View
        style={{
          marginTop: 40,
          width: "100%",
          backgroundColor: CARD_BG,
          padding: 20,
          borderRadius: 16,
          shadowColor: "#000",
          shadowOpacity: isDark ? 0.4 : 0.08,
          shadowRadius: 10,
          elevation: 3,
          borderWidth: 1,
          borderColor: BORDER_SOFT,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginBottom: 10,
          }}
        >
          <Text
            style={{ fontSize: 16, fontWeight: "600", color: TEXT_PRIMARY }}
          >
            퀴즈 맞춘 개수
          </Text>
          <Text
            style={{ fontSize: 16, fontWeight: "600", color: TEXT_PRIMARY }}
          >
            오답 개수
          </Text>
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
          <Text style={{ color: TEXT_SECONDARY, fontSize: 14 }}>이용약관</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginVertical: 6 }}>
          <Text style={{ color: TEXT_SECONDARY, fontSize: 14 }}>고객센터</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
