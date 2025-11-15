import { createNativeStackNavigator } from "@react-navigation/native-stack";
import QuizDetail from "../components/QuizDetail";
import QuizList from "../components/QuizList";

/** ========== 네비게이터 구성 ========== */
const PortfolioStackNav = createNativeStackNavigator();
export default function QuizStack() {
  return (
    <PortfolioStackNav.Navigator
      screenOptions={{ headerTitleAlign: "center", headerShown: false }}
    >
      <PortfolioStackNav.Screen
        name="PortfolioList"
        component={QuizList}
        options={{ title: "퀴즈" }}
      />
      <PortfolioStackNav.Screen
        name="ProjectDetail"
        component={QuizDetail}
        options={{ title: "퀴즈 종류" }}
      />
    </PortfolioStackNav.Navigator>
  );
}
