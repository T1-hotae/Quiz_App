import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
  useColorScheme,
} from "react-native";
import { QUIZZES } from "../src/data/quizzes";

export default function QuizPlayScreen({ route, navigation }) {
  const { quizId } = route.params ?? {};
  const quiz = QUIZZES.find((q) => q.id === quizId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // 🔹 다크모드 감지
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const BG = isDark ? "#020617" : "#ffffff";
  const TEXT_PRIMARY = isDark ? "#e5e7eb" : "#111827";
  const TEXT_SECONDARY = isDark ? "#9ca3af" : "#4b5563";
  const BORDER_SOFT = isDark ? "#374151" : "#d1d5db";

  const CHOICE_BASE = isDark ? "#111827" : "#f3f4f6";
  const CHOICE_SELECTED = isDark ? "#1d4ed8" : "#dbeafe";
  const CHOICE_CORRECT = isDark ? "#14532d" : "#bbf7d0";
  const CHOICE_WRONG = isDark ? "#7f1d1d" : "#fecaca";

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

  const total = quiz.questions.length;
  const question = quiz.questions[currentIndex];

  const handleSelectChoice = (idx) => {
    if (answered) return; // 이미 답한 상태면 무시

    setSelectedIndex(idx);
    const correct = idx === question.answerIndex;
    setIsCorrect(correct);
    setAnswered(true);
    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    const isLast = currentIndex === total - 1;

    if (isLast) {
      setIsFinished(true);
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    setSelectedIndex(null);
    setAnswered(false);
    setIsCorrect(false);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedIndex(null);
    setAnswered(false);
    setIsCorrect(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    // ✅ 퀴즈 끝나고 결과 화면
    return (
      <View
        style={{
          flex: 1,
          padding: 24,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: BG,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 16,
            color: TEXT_PRIMARY,
          }}
        >
          결과
        </Text>
        <Text
          style={{
            fontSize: 18,
            marginBottom: 8,
            color: TEXT_PRIMARY,
          }}
        >
          점수: {score} / {total}
        </Text>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 24,
            color: TEXT_SECONDARY,
          }}
        >
          {score === total
            ? "완벽해요! 🎉"
            : score >= total / 2
            ? "좋아요! 조금만 더 복습해볼까요?"
            : "조금 더 공부해보면 좋겠어요 🙂"}
        </Text>

        {/* 다시 풀기 (Primary) */}
        <Pressable
          onPress={handleRestart}
          style={({ pressed }) => [
            {
              width: "100%",
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
            다시 풀기
          </Text>
        </Pressable>

        {/* 퀴즈 목록으로 (Secondary) */}
        <Pressable
          onPress={() => navigation.navigate("QuizList")}
          style={({ pressed }) => [
            {
              width: "100%",
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
          <Text style={{ color: TEXT_SECONDARY, fontWeight: "600" }}>
            퀴즈 목록으로
          </Text>
        </Pressable>
      </View>
    );
  }

  // 🧠 퀴즈 진행 중 화면
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: BG }}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 8,
          color: TEXT_PRIMARY,
        }}
      >
        {quiz.title}
      </Text>
      <Text
        style={{
          fontSize: 14,
          color: TEXT_SECONDARY,
          marginBottom: 16,
        }}
      >
        문제 {currentIndex + 1} / {total} · 현재 점수 {score}
      </Text>

      <View style={{ marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 18,
            marginBottom: 12,
            color: TEXT_PRIMARY,
          }}
        >
          {question.question}
        </Text>

        {question.choices.map((choice, idx) => {
          const isSelected = selectedIndex === idx;
          const isAnswer = idx === question.answerIndex;

          let backgroundColor = CHOICE_BASE;
          if (answered) {
            if (isAnswer) backgroundColor = CHOICE_CORRECT; // 정답
            else if (isSelected && !isAnswer) backgroundColor = CHOICE_WRONG; // 오답선택
          } else if (isSelected) {
            backgroundColor = CHOICE_SELECTED; // 선택만 한 상태
          }

          return (
            <TouchableOpacity
              key={idx}
              onPress={() => handleSelectChoice(idx)}
              style={{
                padding: 12,
                marginBottom: 8,
                borderRadius: 8,
                backgroundColor,
                borderWidth: 1,
                borderColor: answered && isAnswer ? "#16a34a" : BORDER_SOFT,
              }}
            >
              <Text style={{ color: TEXT_PRIMARY }}>{choice}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {answered && (
        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              fontWeight: "bold",
              color: isCorrect ? "#16a34a" : "#f97373",
              marginBottom: 4,
            }}
          >
            {isCorrect ? "정답입니다! 🎉" : "틀렸어요 😢"}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: TEXT_SECONDARY,
            }}
          >
            {question.explanation}
          </Text>
        </View>
      )}

      {/* 다음/결과 버튼 (Primary 스타일) */}
      <Pressable
        onPress={answered ? handleNext : undefined}
        style={({ pressed }) => [
          {
            marginTop: 8,
            paddingVertical: 14,
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#4f46e5",
            opacity: !answered ? 0.6 : pressed ? 0.7 : 1, // 답 안 골랐을 땐 약간 비활성 느낌
          },
        ]}
      >
        <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>
          {currentIndex === total - 1
            ? answered
              ? "결과 보기"
              : "답을 선택해주세요"
            : answered
            ? "다음 문제"
            : "답을 선택해주세요"}
        </Text>
      </Pressable>
    </ScrollView>
  );
}
