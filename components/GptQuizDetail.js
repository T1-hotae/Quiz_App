// GptQuizDetail.js
import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ActivityIndicator,
  useColorScheme,
} from "react-native";
import { fetchGptQuiz } from "../src/gptQuiz";

export default function GptQuizDetail({ navigation }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [loading, setLoading] = useState(false);

  const BG = isDark ? "#020617" : "#ffffff";
  const TEXT_PRIMARY = isDark ? "#e5e7eb" : "#111827";
  const TEXT_SECONDARY = isDark ? "#9ca3af" : "#4b5563";
  const BORDER_SOFT = isDark ? "#374151" : "#d1d5db";

  const handleStartQuiz = async () => {
    if (loading) return;
    try {
      setLoading(true);

      const questions = await fetchGptQuiz({
        topic: "신경망 기초 (퍼셉트론, 활성화 함수, 역전파)",
        numQuestions: 5,
      });

      navigation.navigate("QuizPlay", {
        quiz: {
          id: "NN-GPT",
          title: "신경망 GPT 퀴즈",
          description: "GPT가 즉석에서 생성한 신경망 기초 퀴즈입니다.",
          questions,
        },
      });
    } catch (e) {
      console.log("GPT 퀴즈 생성 오류:", e);
      // TODO: Alert 같은 걸로 에러 띄워도 좋음
    } finally {
      setLoading(false);
    }
  };

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
        신경망 GPT 퀴즈
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
        <Text style={{ color: TEXT_SECONDARY }}>
          OpenAI GPT가 즉석에서 생성해 주는 신경망 기초 퀴즈입니다. 퍼셉트론,
          활성화 함수, 역전파 등 핵심 개념을 랜덤한 문제로 복습해볼 수 있어요.
        </Text>
      </View>

      {/* 퀴즈 풀기 (GPT 호출) */}
      <Pressable
        onPress={handleStartQuiz}
        style={({ pressed }) => [
          {
            marginTop: 16,
            paddingVertical: 14,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#4f46e5",
            opacity: pressed || loading ? 0.7 : 1,
          },
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
            GPT로 퀴즈 생성해서 풀기
          </Text>
        )}
      </Pressable>

      {/* 뒤로 가기 */}
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
