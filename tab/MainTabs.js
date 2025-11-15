import ProfileScreen from "../screen/ProfileScreen";
import QuizStack from "../tab/QuizStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import AwardsScreen from "../screen/AwardsScreen";

// 하단 탭
const Tab = createBottomTabNavigator();
export default function MainTabs() {
  return (
    <Tab.Navigator
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
        tabBarActiveTintColor: "#3b82f6", // 활성색
        tabBarInactiveTintColor: "#9ca3af", // 비활성색
        headerShown: false,
      })}
    >
      <Tab.Screen name="Awards" component={AwardsScreen} />
      <Tab.Screen name="Home" component={QuizStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
