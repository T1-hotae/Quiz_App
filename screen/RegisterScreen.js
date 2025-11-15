import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { useState } from "react";
import { useAuth } from "../lib/Auth";

export function RegisterScreen() {
  const { signUp, loading, error } = useAuth();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [touched, setTouched] = useState({
    email: false,
    name: false,
    password: false,
    passwordConfirm: false,
  });

  const emailErr =
    touched.email && !/.+@.+\..+/.test(email)
      ? "올바른 이메일 형식이 아닙니다."
      : "";

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
    password.length >= 6 &&
    password === passwordConfirm;

  const submit = async () => {
    setTouched({
      email: true,
      name: true,
      password: true,
      passwordConfirm: true,
    });
    if (!canSubmit) return;
    try {
      await signUp({
        email: email.trim(),
        password,
        name,
      });
    } catch (_) {}
  };

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../assets/ai_quiz_1024.png")}
          style={{ width: 90, height: 90, marginBottom: 20 }}
        />
      </View>

      <Text style={{ fontSize: 26, fontWeight: "800", marginBottom: 16 }}>
        회원가입
      </Text>

      <Text style={{ marginBottom: 6 }}>이름</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        onBlur={() => setTouched((t) => ({ ...t, name: true }))}
        placeholder="이름 입력"
        style={{
          height: 48,
          borderWidth: 1,
          borderColor: "#d1d5db",
          borderRadius: 10,
          paddingHorizontal: 12,
          marginBottom: 12,
        }}
      />

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
          marginBottom: 4,
        }}
      />
      {emailErr ? (
        <Text style={{ color: "#b45309", marginBottom: 8 }}>{emailErr}</Text>
      ) : null}

      <Text style={{ marginBottom: 6, marginTop: 6 }}>비밀번호</Text>
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
          marginBottom: 4,
        }}
      />
      {passErr ? (
        <Text style={{ color: "#b45309", marginBottom: 8 }}>{passErr}</Text>
      ) : null}

      <Text style={{ marginBottom: 6 }}>비밀번호 확인</Text>
      <TextInput
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
        secureTextEntry={true}
        onBlur={() => setTouched((t) => ({ ...t, passwordConfirm: true }))}
        placeholder="비밀번호 다시 입력"
        style={{
          height: 48,
          borderWidth: 1,
          borderColor: confirmErr ? "#f59e0b" : "#d1d5db",
          borderRadius: 10,
          paddingHorizontal: 12,
          marginBottom: 10,
        }}
      />
      {confirmErr ? (
        <Text style={{ color: "#b45309", marginBottom: 8 }}>{confirmErr}</Text>
      ) : null}

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
    </View>
  );
}
