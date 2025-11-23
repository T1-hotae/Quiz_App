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
} from "react-native";
import { useState } from "react";
import { useAuth } from "../src/lib/auth-provider";

export default function RegisterScreen({ onGoLogin }) {
  const { signUp, loading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [department, setDepartment] = useState(""); // ✅ 학과
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [touched, setTouched] = useState({
    email: false,
    name: false,
    department: false,
    password: false,
    passwordConfirm: false,
  });

  // ✅ 간단 검증들
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
      // 회원가입 성공하면 onAuthStateChanged로 로그인 상태가 되고
      // Router에서 isAuthenticated=true가 되면서 HomeScreen으로 넘어가게 됨
    } catch (_) {
      // 에러는 Context의 error로 표시
    }
  };

  // 공통 스타일처럼 쓰는 간단한 헬퍼
  const fieldGap = 14;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0} // 네비바 높이에 따라 조절 가능
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center", // 가운데 정렬 유지
        }}
        keyboardShouldPersistTaps="handled" // 키보드 열린 상태에서도 버튼/인풋 터치 잘 되게
      >
        <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
          {/* 로고 */}
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../assets/ai_quiz_1024.png")}
              style={{
                width: 120,
                height: 120,
                marginBottom: 24,
                borderRadius: 10,
              }}
            />
          </View>

          <Text style={{ fontSize: 26, fontWeight: "800", marginBottom: 20 }}>
            회원가입
          </Text>

          {/* 이름 */}
          <View style={{ marginBottom: fieldGap }}>
            <Text style={{ marginBottom: 6 }}>이름</Text>
            <TextInput
              value={name}
              onChangeText={setName}
              onBlur={() => setTouched((t) => ({ ...t, name: true }))}
              placeholder="이름 입력"
              style={{
                height: 48,
                borderWidth: 1,
                borderColor: nameErr ? "#f59e0b" : "#d1d5db",
                borderRadius: 10,
                paddingHorizontal: 12,
              }}
            />
            {nameErr ? (
              <Text style={{ color: "#b45309", marginTop: 4 }}>{nameErr}</Text>
            ) : null}
          </View>

          {/* 학과 */}
          <View style={{ marginBottom: fieldGap }}>
            <Text style={{ marginBottom: 6 }}>학과</Text>
            <TextInput
              value={department}
              onChangeText={setDepartment}
              onBlur={() => setTouched((t) => ({ ...t, department: true }))}
              placeholder="학과 입력"
              style={{
                height: 48,
                borderWidth: 1,
                borderColor: deptErr ? "#f59e0b" : "#d1d5db",
                borderRadius: 10,
                paddingHorizontal: 12,
              }}
            />
            {deptErr ? (
              <Text style={{ color: "#b45309", marginTop: 4 }}>{deptErr}</Text>
            ) : null}
          </View>

          {/* 이메일 */}
          <View style={{ marginBottom: fieldGap }}>
            <Text style={{ marginBottom: 6 }}>이메일</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholder="이메일 입력"
              style={{
                height: 48,
                borderWidth: 1,
                borderColor: emailErr ? "#f59e0b" : "#d1d5db",
                borderRadius: 10,
                paddingHorizontal: 12,
              }}
            />
            {emailErr ? (
              <Text style={{ color: "#b45309", marginTop: 4 }}>{emailErr}</Text>
            ) : null}
          </View>

          {/* 비밀번호 */}
          <View style={{ marginBottom: fieldGap }}>
            <Text style={{ marginBottom: 6 }}>비밀번호</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              onBlur={() => setTouched((t) => ({ ...t, password: true }))}
              placeholder="비밀번호 (6자 이상)"
              style={{
                height: 48,
                borderWidth: 1,
                borderColor: passErr ? "#f59e0b" : "#d1d5db",
                borderRadius: 10,
                paddingHorizontal: 12,
              }}
            />
            {passErr ? (
              <Text style={{ color: "#b45309", marginTop: 4 }}>{passErr}</Text>
            ) : null}
          </View>

          {/* 비밀번호 확인 */}
          <View style={{ marginBottom: fieldGap }}>
            <Text style={{ marginBottom: 6 }}>비밀번호 확인</Text>
            <TextInput
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              secureTextEntry={true}
              onBlur={() =>
                setTouched((t) => ({ ...t, passwordConfirm: true }))
              }
              placeholder="비밀번호 다시 입력"
              style={{
                height: 48,
                borderWidth: 1,
                borderColor: confirmErr ? "#f59e0b" : "#d1d5db",
                borderRadius: 10,
                paddingHorizontal: 12,
              }}
            />
            {confirmErr ? (
              <Text style={{ color: "#b45309", marginTop: 4 }}>
                {confirmErr}
              </Text>
            ) : null}
          </View>

          {/* 서버에서 온 에러 */}
          {error ? (
            <Text style={{ color: "#dc2626", marginBottom: 8 }}>{error}</Text>
          ) : null}

          {/* 가입 버튼 */}
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

          {/* 로그인으로 이동 */}
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
