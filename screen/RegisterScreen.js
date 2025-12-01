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
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { useAuth } from "../src/lib/auth-provider";
import { createStyles } from "./RegisterScreenStyle";

export default function RegisterScreen({ onGoLogin }) {
  const { signUp, loading, error } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const styles = createStyles(isDark);

  // ... (state, validate, submit 전부 기존 코드 그대로)

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
        <View style={styles.inner}>
          <View style={styles.logoWrapper}>
            <Image
              source={require("../assets/quiz_intro.png")}
              style={styles.logo}
            />
          </View>
          <Text style={styles.title}>회원가입</Text>

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
