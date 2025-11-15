// QuizDetail.js
import { View, Text, Button } from "react-native";
import { QUIZZES } from "../src/data/quizzes"; // 경로 수정

export default function QuizDetail({ route, navigation }) {
  const { quizId } = route.params ?? {};
  const quiz = QUIZZES.find((q) => q.id === quizId);

  if (!quiz) {
    return (
      <View style={{ flex: 1, padding: 24, backgroundColor: "#fff" }}>
        <Text>존재하지 않는 퀴즈입니다.</Text>
        <Button title="뒤로" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 24, gap: 12, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{quiz.title}</Text>

      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: "bold" }}>개요:</Text>
        <Text>{quiz.description}</Text>
      </View>

      <Button
        title="퀴즈 풀기"
        onPress={() => navigation.navigate("QuizPlay", { quizId: quiz.id })}
      />
      <View style={{ height: 12 }} />
      <Button title="뒤로" onPress={() => navigation.goBack()} />
    </View>
  );
}
