import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuizDetail from "../components/QuizDetail";
import QuizList from "../components/QuizList";
import QuizPlayScreen from "../components/QuizScreen";

/** ========== 네비게이터 구성 ========== */
const Stack = createNativeStackNavigator();
export default function QuizStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerTitleAlign: "center", headerShown: false }}
    >
      <Stack.Screen
        name="QuizList"
        component={QuizList}
        options={{ title: "AI Quiz" }}
      />
      <Stack.Screen
        name="QuizDetail"
        component={QuizDetail}
        options={{ title: "퀴즈 설명" }}
      />
      <Stack.Screen
        name="QuizPlay"
        component={QuizPlayScreen}
        options={{ title: "퀴즈 풀기" }}
      />
    </Stack.Navigator>
  );
}
