// AwardsScreen.js
import { ScrollView, View, Text, StyleSheet } from "react-native";

export default function AwardsScreen() {
  const achievements = [
    {
      id: "first-quiz",
      title: "첫 퀴즈 클리어 🎉",
      tag: "신경망 퀴즈",
      description: "어떤 퀴즈든 1회 이상 끝까지 풀기",
      unlocked: true,
      progressText: "1 / 1",
    },
    {
      id: "perfect-nn",
      title: "신경망 달인 🧠",
      tag: "Neural Network",
      description: "신경망 퀴즈에서 만점 받기",
      unlocked: false,
      progressText: "0 / 1",
    },
    {
      id: "ml-beginner",
      title: "머신러닝 입문자",
      tag: "Machine Learning",
      description: "머신러닝 퀴즈 1회 이상 시도하기",
      unlocked: true,
      progressText: "1 / 1",
    },
    {
      id: "streak-3",
      title: "3일 연속 출석 💪",
      tag: "Routine",
      description: "3일 연속으로 앱에서 퀴즈 풀기",
      unlocked: false,
      progressText: "1 / 3",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.awardsContainer}>
      <Text style={styles.awardsTitle}>업적</Text>

      {achievements.map((a) => (
        <View key={a.id} style={styles.awardsCard}>
          {/* 상단: 제목 + 태그 + 해금 상태 */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 4,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text style={styles.postTitle}>{a.title}</Text>
              <Text style={styles.tag}>#{a.tag}</Text>
            </View>

            <Text
              style={{
                fontSize: 12,
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 999,
                backgroundColor: a.unlocked ? "#DCFCE7" : "#E5E7EB",
                color: a.unlocked ? "#166534" : "#4B5563",
              }}
            >
              {a.unlocked ? "해금됨" : "잠금"}
            </Text>
          </View>

          {/* 설명 */}
          <Text style={{ fontSize: 12, color: "#4B5563", marginBottom: 4 }}>
            {a.description}
          </Text>

          {/* 진행도 */}
          <Text style={{ fontSize: 11, color: "#6B7280" }}>
            진행도: {a.progressText}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // styles.js 예시
  awardsContainer: {
    padding: 24,
    backgroundColor: "#fff",
    gap: 12,
  },
  awardsTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  awardsCard: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#F9FAFB",
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  tag: {
    fontSize: 12,
    color: "#6B7280",
  },
});
