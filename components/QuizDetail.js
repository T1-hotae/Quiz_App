// QuizDetail.js
import { View, Text, Pressable } from "react-native";
import { QUIZZES } from "../src/data/quizzes";

export default function QuizDetail({ route, navigation }) {
  const { quizId } = route.params ?? {};
  const quiz = QUIZZES.find((q) => q.id === quizId);

  if (!quiz) {
    return (
      <View style={{ flex: 1, padding: 24, backgroundColor: "#fff" }}>
        <Text>존재하지 않는 퀴즈입니다.</Text>

        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            {
              marginTop: 16,
              paddingVertical: 12,
              borderRadius: 8,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#e5e7eb", // 연한 회색
              opacity: pressed ? 0.7 : 1,
            },
          ]}
        >
          <Text style={{ fontWeight: "600", color: "#111827" }}>뒤로</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 12, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{quiz.title}</Text>

      <View style={{ paddingVertical: 10 }}>
        <Text style={{ fontWeight: "bold", marginBottom: 4 }}>개요:</Text>
        <Text>{quiz.description}</Text>
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
            backgroundColor: "#4f46e5", // 보라/인디고 느낌
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
            borderColor: "#d1d5db",
            backgroundColor: "#ffffff",
            opacity: pressed ? 0.7 : 1,
          },
        ]}
      >
        <Text style={{ color: "#4b5563", fontWeight: "600" }}>뒤로</Text>
      </Pressable>
    </View>
  );
}
