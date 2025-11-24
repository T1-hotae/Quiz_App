// AwardsScreen.js
import { ScrollView, View, Text } from "react-native";
import { achievements } from "../src/data/achievement";
import { createStyles } from "./AwardScreenStyle";
import { useColorScheme } from "react-native";

export default function AwardsScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = createStyles(isDark);

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
