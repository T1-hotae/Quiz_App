import ProfileScreen from "../screen/ProfileScreen";
import QuizStack from "../tab/QuizStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import AwardsScreen from "../screen/AwardsScreen";
import { useColorScheme } from "react-native";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Awards") {
            iconName = focused ? "book" : "book-outline";
          }

          return <Ionicons name={iconName} size={26} color={color} />;
        },
        // ✅ 다크/라이트 공통 옵션
        headerShown: false,
        tabBarActiveTintColor: isDark ? "#60a5fa" : "#3b82f6",
        tabBarInactiveTintColor: isDark ? "#6b7280" : "#9ca3af",
        tabBarStyle: {
          backgroundColor: isDark ? "#020617" : "#ffffff",
          borderTopColor: isDark ? "#1f2937" : "#e5e7eb",
        },
      })}
    >
      <Tab.Screen name="Awards" component={AwardsScreen} />
      <Tab.Screen name="Home" component={QuizStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
