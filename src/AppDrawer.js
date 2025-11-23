import { createDrawerNavigator } from "@react-navigation/drawer";
import MainTabs from "../tab/MainTabs";
import LogoutScreen from "../screen/LogoutScreen";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator>
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
