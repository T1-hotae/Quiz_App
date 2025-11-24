import { View, Text, Pressable, useColorScheme } from "react-native";
import { QUIZZES } from "../src/data/quizzes";

export default function QuizDetail({ route, navigation }) {
  const { quizId } = route.params ?? {};
  const quiz = QUIZZES.find((q) => q.id === quizId);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const BG = isDark ? "#020617" : "#ffffff";
  const TEXT_PRIMARY = isDark ? "#e5e7eb" : "#111827";
  const TEXT_SECONDARY = isDark ? "#9ca3af" : "#4b5563";
  const BORDER_SOFT = isDark ? "#374151" : "#d1d5db";

  if (!quiz) {
    return (
      <View style={{ flex: 1, padding: 24, backgroundColor: BG }}>
        <Text style={{ color: TEXT_PRIMARY }}>존재하지 않는 퀴즈입니다.</Text>

        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            {
              marginTop: 16,
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: isDark ? "#1f2937" : "#e5e7eb",
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Text style={{ fontWeight: "600", color: TEXT_PRIMARY }}>뒤로</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        padding: 24,
        gap: 12,
        backgroundColor: BG,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: TEXT_PRIMARY,
        }}
      >
        {quiz.title}
      </Text>

      <View style={{ paddingVertical: 10 }}>
        <Text
          style={{
            fontWeight: "bold",
            marginBottom: 4,
            color: TEXT_PRIMARY,
          }}
        >
          개요:
        </Text>
        <Text style={{ color: TEXT_SECONDARY }}>{quiz.description}</Text>
      </View>

      {/* 퀴즈 풀기 버튼 (Primary) */}
      <Pressable
        onPress={() => navigation.navigate("QuizPlay", { quizId: quiz.id })}
        style={({ pressed }) => [
          {
            marginTop: 16,
            paddingVertical: 14,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#4f46e5",
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
          퀴즈 풀기
        </Text>
      </Pressable>

      {/* 뒤로가기 버튼 (Secondary) */}
      <Pressable
        onPress={() => navigation.goBack()}
        style={({ pressed }) => [
          {
            marginTop: 10,
            paddingVertical: 12,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: BORDER_SOFT,
            backgroundColor: isDark ? "#020617" : "#ffffff",
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <Text style={{ color: TEXT_SECONDARY, fontWeight: "600" }}>뒤로</Text>
      </Pressable>
    </View>
  );
}
