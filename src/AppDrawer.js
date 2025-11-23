import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabs from "../tab/MainTabs";
import LogoutScreen from "../screen/LogoutScreen";
import { useColorScheme } from "react-native";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? "#020617" : "#ffffff",
        },
        headerTintColor: isDark ? "#e5e7eb" : "#111827",
        drawerStyle: {
          backgroundColor: isDark ? "#020617" : "#ffffff",
        },
        drawerActiveTintColor: isDark ? "#60a5fa" : "#2563eb",
        drawerInactiveTintColor: isDark ? "#9ca3af" : "#4b5563",
        drawerActiveBackgroundColor: isDark ? "rgba(37,99,235,0.2)" : "#e0ecff",
        sceneContainerStyle: {
          backgroundColor: isDark ? "#020617" : "#f9fafb",
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={MainTabs}
        options={{ title: "홈" }}
      />
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{ title: "로그아웃" }}
      />
    </Drawer.Navigator>
  );
}
