import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  useColorScheme,
} from "react-native";
import { useAuth } from "../../src/lib/auth-provider";
import { createStyles } from "./LoginScreenStyle";

export default function LoginScreen({ onGoRegister }) {
  const { signIn, loading, error } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = createStyles(isDark);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState({ email: false, password: false });
  const [secure, setSecure] = useState(true);

  const emailErr =
    touched.email && !/.+@.+\..+/.test(email)
      ? "올바른 이메일 형식이 아닙니다."
      : "";
  const passErr =
    touched.password && password.length < 6
      ? "비밀번호는 6자 이상이어야 합니다."
      : "";

  const canSubmit = /.+@.+\..+/.test(email) && password.length >= 6 && !loading;

  const submit = async () => {
    setTouched({ email: true, password: true });
    if (!canSubmit) return;
    try {
      await signIn({ email: email.trim(), password });
    } catch (_) {
      // 에러는 Context의 error로 표시
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.logoWrapper}>
          <Image
            source={require("../../assets/quiz_intro.png")}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>로그인</Text>

        <Text style={styles.label}>이메일</Text>
        <TextInput
          testID="input-email"
          value={email}
          onChangeText={setEmail}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="이메일을 입력하세요."
          placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
          style={[styles.input, emailErr && styles.inputError]}
        />
        {emailErr ? <Text style={styles.errorText}>{emailErr}</Text> : null}

        <Text style={[styles.label, { marginTop: 8 }]}>비밀번호</Text>
        <View style={[styles.passwordRow, passErr && styles.inputError]}>
          <TextInput
            testID="input-password"
            value={password}
            onChangeText={setPassword}
            onBlur={() => setTouched((t) => ({ ...t, password: true }))}
            secureTextEntry={secure}
            placeholder="비밀번호"
            placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
            style={styles.passwordInput}
          />
          <Pressable onPress={() => setSecure((s) => !s)} hitSlop={8}>
            <Text style={styles.toggleText}>{secure ? "보기" : "숨기기"}</Text>
          </Pressable>
        </View>
        {passErr ? <Text style={styles.errorText}>{passErr}</Text> : null}

        {error ? (
          <Text testID="text-error" style={styles.globalError}>
            {error}
          </Text>
        ) : null}

        <Pressable
          testID="btn-submit"
          onPress={submit}
          disabled={!canSubmit}
          style={styles.submitButton(canSubmit)}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>로그인</Text>
          )}
        </Pressable>

        <Pressable onPress={onGoRegister} style={styles.linkWrapper}>
          <Text style={styles.linkText}>아직 계정이 없나요? 회원가입</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
