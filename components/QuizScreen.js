// QuizPlayScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Button } from "react-native";
import { QUIZZES } from "../src/data/quizzes"; // 경로 수정

export default function QuizPlayScreen({ route, navigation }) {
  const { quizId } = route.params ?? {};
  const quiz = QUIZZES.find((q) => q.id === quizId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!quiz) {
    return (
      <View style={{ flex: 1, padding: 24, backgroundColor: "#fff" }}>
        <Text>존재하지 않는 퀴즈입니다.</Text>
        <Button title="뒤로" onPress={() => navigation.goBack()} />
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
      // 마지막 문제였다면 퀴즈 종료
      setIsFinished(true);
      return;
    }

    // 다음 문제로
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
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          결과
        </Text>
        <Text style={{ fontSize: 18, marginBottom: 8 }}>
          점수: {score} / {total}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 24 }}>
          {score === total
            ? "완벽해요! 🎉"
            : score >= total / 2
            ? "좋아요! 조금만 더 복습해볼까요?"
            : "조금 더 공부해보면 좋겠어요 🙂"}
        </Text>

        <Button title="다시 풀기" onPress={handleRestart} />
        <View style={{ height: 12 }} />
        <Button
          title="퀴즈 목록으로"
          onPress={() => navigation.navigate("QuizList")}
        />
      </View>
    );
  }

  // 🧠 퀴즈 진행 중 화면
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ padding: 24 }}
    >
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
        {quiz.title}
      </Text>
      <Text style={{ fontSize: 14, color: "#666", marginBottom: 16 }}>
        문제 {currentIndex + 1} / {total} · 현재 점수 {score}
      </Text>

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, marginBottom: 12 }}>
          {question.question}
        </Text>

        {question.choices.map((choice, idx) => {
          const isSelected = selectedIndex === idx;
          const isAnswer = idx === question.answerIndex;

          let backgroundColor = "#f3f4f6"; // 기본
          if (answered) {
            if (isAnswer) backgroundColor = "#bbf7d0"; // 정답 (연한 초록)
            else if (isSelected && !isAnswer) backgroundColor = "#fecaca"; // 오답 선택
          } else if (isSelected) {
            backgroundColor = "#dbeafe"; // 선택만 한 상태
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
                borderColor: answered && isAnswer ? "#16a34a" : "#e5e7eb",
              }}
            >
              <Text>{choice}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {answered && (
        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              fontWeight: "bold",
              color: isCorrect ? "#16a34a" : "#dc2626",
              marginBottom: 4,
            }}
          >
            {isCorrect ? "정답입니다! 🎉" : "틀렸어요 😢"}
          </Text>
          <Text style={{ fontSize: 14, color: "#444" }}>
            {question.explanation}
          </Text>
        </View>
      )}

      <Button
        title={
          currentIndex === total - 1
            ? answered
              ? "결과 보기"
              : "답을 선택해주세요"
            : answered
            ? "다음 문제"
            : "답을 선택해주세요"
        }
        onPress={answered ? handleNext : undefined}
      />
    </ScrollView>
  );
}
