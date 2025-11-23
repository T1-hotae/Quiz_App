import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen } from "../screen/LoginScreen";
import { RegisterScreen } from "../screen/RegisterScreen";

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" options={{ title: "로그인" }}>
        {(props) => (
          <LoginScreen
            {...props}
            onGoRegister={() => props.navigation.navigate("Register")}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="Register" options={{ title: "회원가입" }}>
        {(props) => (
          <RegisterScreen
            {...props}
            onGoLogin={() => props.navigation.navigate("Login")}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
