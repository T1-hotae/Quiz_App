// QuizList.js
import { Text, TouchableOpacity, ScrollView, View } from "react-native";
import { styles } from "../src/styles";
import { QUIZZES } from "../src/data/quizzes"; // 경로는 맞게 수정

export default function QuizList({ navigation }) {
  return (
    <ScrollView
      style={{ flex: 1, padding: 24, backgroundColor: "#fff" }}
      contentContainerStyle={{ gap: 12 }}
    >
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 12 }}>
        AI Quiz
      </Text>

      {QUIZZES.map((quiz) => (
        <TouchableOpacity
          key={quiz.id}
          style={styles.detailButton}
          onPress={() => navigation.navigate("QuizDetail", { quizId: quiz.id })}
        >
          <View>
            <Text style={styles.buttonText}>{quiz.title}</Text>
            <Text style={{ fontSize: 12, color: "#555", marginTop: 4 }}>
              {quiz.description}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
