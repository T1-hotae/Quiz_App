import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme,
  Modal,
} from "react-native";
import { useEffect, useState } from "react";
import { useAuth } from "../../src/lib/auth-provider";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

// 🔹 아바타 이미지 매핑
const AVATARS = {
  Boy: require("../../assets/Profile/Boy.png"),
  Girl: require("../../assets/Profile/Girl.png"),
  Man: require("../../assets/Profile/Man.png"),
  Woman: require("../../assets/Profile/Woman.png"),
  Grandpa: require("../../assets/Profile/Grandpa.png"),
  Grandma: require("../../assets/Profile/Grandma.png"),
};

const AVATAR_KEYS = Object.keys(AVATARS); // ["Boy", "Girl", "Grandma", ...]

export default function ProfileScreen() {
  const { user } = useAuth(); // 🔹 Firebase Auth 사용자 (uid, email 등)
  const [profile, setProfile] = useState(null); // Firestore 프로필
  const [loading, setLoading] = useState(true);

  const [avatarKey, setAvatarKey] = useState("Boy");
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [savingAvatar, setSavingAvatar] = useState(false);

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
          const data = snap.data();
          setProfile(data);
          if (data.avatarKey && AVATARS[data.avatarKey]) {
            setAvatarKey(data.avatarKey);
          } else {
            setAvatarKey("Boy"); // 기본값
          }
        } else {
          // 혹시 문서가 없으면 기본값
          const defaultProfile = {
            name: user.displayName || "",
            email: user.email || "",
            department: "",
          };
          setProfile(defaultProfile);
          setAvatarKey("Boy");
        }
      } catch (e) {
        console.log("프로필 불러오기 오류:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const correctCount = profile?.quizCorrectCount ?? 0;
  const wrongCount = profile?.quizWrongCount ?? 0;

  // 🔹 아바타 변경 & Firestore 저장
  const handleSelectAvatar = async (key) => {
    if (!user) return;
    try {
      setSavingAvatar(true);
      setAvatarKey(key);

      const ref = doc(db, "users", user.uid);

      await setDoc(
        ref,
        {
          avatarKey: key,
        },
        { merge: true }
      );

      setProfile((prev) => ({
        ...(prev || {}),
        avatarKey: key,
      }));

      setAvatarModalVisible(false);
    } catch (e) {
      console.log("아바타 저장 오류:", e);
    } finally {
      setSavingAvatar(false);
    }
  };

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

  const avatarSource = AVATARS[avatarKey] ?? AVATARS.Boy;

  return (
    <>
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
          {/* 프로필 이미지 (터치하면 모달 열림) */}
          <TouchableOpacity
            onPress={() => setAvatarModalVisible(true)}
            activeOpacity={0.7}
          >
            <Image
              source={avatarSource}
              style={{
                width: 90,
                height: 90,
                borderRadius: 45,
                marginBottom: 8,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                textAlign: "center",
                color: TEXT_SECONDARY,
              }}
            >
              프로필 이미지 변경
            </Text>
          </TouchableOpacity>

          {/* 이름 / 전공 */}
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              marginTop: 8,
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
            🔥 레벨: <Text style={{ color: "#3b82f6" }}>플래티넘</Text>
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
              {correctCount}
            </Text>
            <Text style={{ fontSize: 24, fontWeight: "700", color: "#ef4444" }}>
              {wrongCount}
            </Text>
          </View>
        </View>

        {/* 하단 메뉴 */}
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <TouchableOpacity style={{ marginVertical: 6 }}>
            <Text style={{ color: TEXT_SECONDARY, fontSize: 14 }}>
              이용약관
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={{ marginVertical: 6 }}>
            <Text style={{ color: TEXT_SECONDARY, fontSize: 14 }}>
              고객센터
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 🔹 아바타 선택 모달 */}
      <Modal
        visible={avatarModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setAvatarModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.6)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "80%",
              backgroundColor: CARD_BG,
              borderRadius: 16,
              padding: 20,
              borderWidth: 1,
              borderColor: BORDER_SOFT,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "600",
                marginBottom: 16,
                color: TEXT_PRIMARY,
                textAlign: "center",
              }}
            >
              프로필 이미지 선택
            </Text>

            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              {AVATAR_KEYS.map((key) => (
                <TouchableOpacity
                  key={key}
                  style={{
                    width: "30%",
                    alignItems: "center",
                    marginBottom: 16,
                    opacity: savingAvatar && avatarKey !== key ? 0.5 : 1,
                  }}
                  onPress={() => handleSelectAvatar(key)}
                  disabled={savingAvatar}
                >
                  <Image
                    source={AVATARS[key]}
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 32,
                      marginBottom: 6,
                      borderWidth: avatarKey === key ? 2 : 1,
                      borderColor: avatarKey === key ? "#3b82f6" : BORDER_SOFT,
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: avatarKey === key ? "#3b82f6" : TEXT_SECONDARY,
                    }}
                  >
                    {key}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={() => setAvatarModalVisible(false)}
              style={{
                marginTop: 8,
                alignSelf: "center",
                paddingVertical: 8,
                paddingHorizontal: 20,
                borderRadius: 999,
                borderWidth: 1,
                borderColor: BORDER_SOFT,
              }}
            >
              <Text style={{ color: TEXT_SECONDARY }}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
