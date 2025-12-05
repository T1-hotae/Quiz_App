import { Text, TouchableOpacity, ScrollView, View } from "react-native";
import { QUIZZES } from "../../src/data/quizzes";
import { getStyles } from "./QuizListStyle";
import { useColorScheme } from "react-native";

export default function QuizList({ navigation }) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = getStyles(isDark);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.badge}>AI QUIZ</Text>
        <Text style={styles.title}>어떤 퀴즈부터 풀어볼까요?</Text>
        <Text style={styles.subtitle}>
          주제를 골라 AI와 함께 문제를 풀어보세요.
        </Text>
      </View>

      {/* ✅ GPT 신경망 퀴즈 카드 (새로 추가) */}
      <TouchableOpacity
        activeOpacity={0.9}
        style={[styles.card, { borderWidth: 1, borderColor: "#4f46e5" }]}
        onPress={() => navigation.navigate("GptQuizDetail")}
      >
        <View style={styles.iconCircle}>
          <Text style={styles.iconEmoji}>🧠</Text>
        </View>

        <View style={styles.cardBody}>
          <Text style={styles.cardTitle} numberOfLines={1}>
            신경망 GPT 퀴즈
          </Text>
          <Text style={styles.cardDescription} numberOfLines={2}>
            GPT가 즉석에서 만들어주는 신경망 기초(퍼셉트론, 활성화 함수, 역전파)
            객관식 퀴즈를 풀어보세요.
          </Text>
          <View style={styles.cardFooter}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>GPT로 생성</Text>
            </View>
            <Text style={styles.metaText}>5문제 · 랜덤 출제</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* 기존 퀴즈 카드들 */}
      {QUIZZES.map((quiz) => (
        <TouchableOpacity
          key={quiz.id}
          activeOpacity={0.85}
          style={styles.card}
          onPress={() => navigation.navigate("QuizDetail", { quizId: quiz.id })}
        >
          {/* 왼쪽 아이콘 영역 */}
          <View style={styles.iconCircle}>
            <Text style={styles.iconEmoji}>🤖</Text>
          </View>

          {/* 오른쪽 텍스트 영역 */}
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle} numberOfLines={1}>
              {quiz.title}
            </Text>

            {quiz.description ? (
              <Text style={styles.cardDescription} numberOfLines={2}>
                {quiz.description}
              </Text>
            ) : null}

            <View style={styles.cardFooter}>
              <View style={styles.chip}>
                <Text style={styles.chipText}>퀴즈 시작하기</Text>
              </View>

              {Array.isArray(quiz.questions) && (
                <Text style={styles.metaText}>
                  {quiz.questions.length} 문제
                </Text>
              )}
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
