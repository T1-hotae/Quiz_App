import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { styles } from "../src/styles";

export default function QuizList({ navigation }) {
  return (
    <ScrollView
      style={{ flex: 1, padding: 24, gap: 12, backgroundColor: "#fff" }}
    >
      <Text style={{ fontSize: 28, fontWeight: "bold" }}>AI Quiz</Text>
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => navigation.navigate("ProjectDetail", { id: "A" })}
      >
        <Text style={styles.buttonText}>신경망 퀴즈</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => navigation.navigate("ProjectDetail", { id: "B" })}
      >
        <Text style={styles.buttonText}>머신러닝 퀴즈</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
