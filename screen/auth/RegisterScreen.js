import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  useColorScheme,
} from "react-native";
import { useState } from "react";
import { useAuth } from "../../src/lib/auth-provider";
import { createStyles } from "./RegisterScreenStyle";

const fieldGap = 10;

export default function RegisterScreen({ onGoLogin }) {
  const { signUp, loading, error } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = createStyles(isDark);

  const headerHeight = Platform.OS === "ios" ? 90 : 0;

  const placeholderColor = isDark ? "#6b7280" : "#9ca3af";

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [touched, setTouched] = useState({
    email: false,
    name: false,
    department: false,
    password: false,
    passwordConfirm: false,
  });

  const emailErr =
    touched.email && !/.+@.+\..+/.test(email)
      ? "올바른 이메일 형식이 아닙니다."
      : "";
  const nameErr = touched.name && !name.trim() ? "이름을 입력해주세요." : "";
  const deptErr =
    touched.department && !department.trim() ? "학과를 입력해주세요." : "";
  const passErr =
    touched.password && password.length < 6
      ? "비밀번호는 6자 이상이어야 합니다."
      : "";
  const confirmErr =
    touched.passwordConfirm && password !== passwordConfirm
      ? "비밀번호가 서로 일치하지 않습니다."
      : "";

  const canSubmit =
    !loading &&
    /.+@.+\..+/.test(email) &&
    name.trim().length > 0 &&
    department.trim().length > 0 &&
    password.length >= 6 &&
    password === passwordConfirm;

  const submit = async () => {
    setTouched({
      email: true,
      name: true,
      department: true,
      password: true,
      passwordConfirm: true,
    });
    if (!canSubmit) return;
    try {
      await signUp({
        email: email.trim(),
        password,
        name: name.trim(),
        department: department.trim(),
      });
    } catch (_) {}
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? headerHeight : 0}
    >
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingVertical: 32, // 🔹 위아래 여유 (필요하면 40~48까지도)
          },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.inner}>
          <View style={styles.logoWrapper}>
            <Image
              source={require("../../assets/quiz_intro.png")}
              style={styles.logo}
            />
          </View>
          <Text style={styles.title}>회원가입</Text>

          {/* 이름 */}
          <View style={{ marginBottom: fieldGap }}>
            <Text style={styles.label}>이름</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              placeholder="이름 입력"
              style={[styles.input, nameErr && styles.inputError]}
              placeholderTextColor={placeholderColor}
            />
            {nameErr ? (
              <Text style={{ color: "#b45309", marginTop: 4 }}>{nameErr}</Text>
            ) : null}
          </View>

          {/* 학과 */}
          <View style={{ marginBottom: fieldGap }}>
            <Text style={styles.label}>학과</Text>
            <TextInput
              value={department}
              onChangeText={setDepartment}
              onBlur={() => setTouched((t) => ({ ...t, department: true }))}
              placeholder="학과 입력"
              style={[styles.input, nameErr && styles.inputError]}
              placeholderTextColor={placeholderColor}
            />
            {nameErr ? <Text style={styles.errorText}>{nameErr}</Text> : null}
          </View>

          {/* 이메일 */}
          <View style={{ marginBottom: fieldGap }}>
            <Text style={styles.label}>이메일</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="이메일 입력"
              style={[styles.input, deptErr && styles.inputError]}
              placeholderTextColor={placeholderColor}
            />
            {emailErr ? <Text style={styles.errorText}>{emailErr}</Text> : null}
          </View>

          {/* 비밀번호 */}
          <View style={{ marginBottom: fieldGap }}>
            <Text style={styles.label}>비밀번호</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              placeholder="비밀번호 (6자 이상)"
              style={[styles.input, deptErr && styles.inputError]}
              placeholderTextColor={placeholderColor}
            />
            {passErr ? <Text style={styles.errorText}>{passErr}</Text> : null}
          </View>

          {/* 비밀번호 확인 */}
          <View style={{ marginBottom: fieldGap }}>
            <Text style={styles.label}>비밀번호 확인</Text>
            <TextInput
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              secureTextEntry={true}
              onBlur={() =>
                setTouched((t) => ({ ...t, passwordConfirm: true }))
              }
              placeholder="비밀번호 다시 입력"
              style={[styles.input, deptErr && styles.inputError]}
              placeholderTextColor={placeholderColor}
            />
            {confirmErr ? (
              <Text style={styles.errorText}>{confirmErr}</Text>
            ) : null}
          </View>

          {error ? (
            <Text style={{ color: "#dc2626", marginBottom: 8 }}>{error}</Text>
          ) : null}

          <Pressable
            onPress={submit}
            disabled={!canSubmit}
            style={{
              height: 48,
              borderRadius: 12,
              backgroundColor: canSubmit ? "#4f46e5" : "#9ca3af",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 8,
            }}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={{ color: "#fff", fontWeight: "700" }}>가입하기</Text>
            )}
          </Pressable>

          <Pressable
            onPress={onGoLogin}
            style={{ marginTop: 16, alignSelf: "center" }}
          >
            <Text style={{ color: "#2563eb", fontWeight: "600" }}>
              이미 계정이 있나요? 로그인
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
