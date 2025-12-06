import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from "react-native";

import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

// Firebase 설정
import { db, auth } from "../../services/firebase";

// Firestore helper
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

// Auth provider
import { useAuth } from "../../src/lib/auth-provider";

import { chatStyles as styles } from "./ChatScreenStyle";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const [userProfiles, setUserProfiles] = useState({});

  const { user } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const tabBarHeight = useBottomTabBarHeight(); // 🔹 Tab 높이만큼 offset

  const BG = isDark ? "#020617" : "#f9fafb";
  const BUBBLE_ME = isDark ? "#1d4ed8" : "#3b82f6";
  const BUBBLE_OTHER = isDark ? "#111827" : "#e5e7eb";
  const TEXT_PRIMARY = isDark ? "#e5e7eb" : "#111827";
  const TEXT_SECONDARY = isDark ? "#9ca3af" : "#6b7280";
  const INPUT_BG = isDark ? "#020617" : "#ffffff";
  const INPUT_BORDER = isDark ? "#374151" : "#d1d5db";

  // 🔹 실시간 메시지 구독
  useEffect(() => {
    if (!user) {
      setMessages([]);
      return;
    }

    const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(list);
    });

    return unsubscribe;
  }, [user]);

  // 🔹 users 컬렉션 구독 (uid -> 프로필)
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const map = {};
      snapshot.forEach((doc) => {
        map[doc.id] = doc.data(); // doc.id === uid
      });
      setUserProfiles(map);
    });

    return unsubscribe;
  }, []);

  // 🔹 메시지 전송
  const sendMessage = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser || !text.trim()) return;

    const displayName = currentUser.displayName || currentUser.email || "익명";

    try {
      await addDoc(collection(db, "messages"), {
        text: text.trim(),
        createdAt: serverTimestamp(),
        userId: currentUser.uid,
        userName: displayName,
      });
      setText("");
    } catch (e) {
      console.log("sendMessage error:", e);
    }
  };

  const renderItem = ({ item }) => {
    const currentUid = auth.currentUser?.uid;
    const isMe = item.userId === currentUid;

    const profile = userProfiles[item.userId];
    const displayName = profile?.name || item.userName || "익명";

    return (
      <View
        style={[
          styles.messageRow,
          { justifyContent: isMe ? "flex-end" : "flex-start" },
        ]}
      >
        {/* 이름 + 말풍선을 세로로 묶는 래퍼 */}
        <View
          style={[
            styles.messageWrapper,
            { alignItems: isMe ? "flex-end" : "flex-start" },
          ]}
        >
          {/* 🔹 상대방일 때만 위에 이름 표시 */}
          {!isMe && (
            <Text
              style={[
                styles.userName,
                { color: TEXT_SECONDARY, marginBottom: 2 },
              ]}
            >
              {displayName}
            </Text>
          )}

          <View
            style={[
              styles.messageBubble,
              isMe ? styles.bubbleMe : styles.bubbleOther,
              {
                backgroundColor: isMe ? BUBBLE_ME : BUBBLE_OTHER,
                alignSelf: isMe ? "flex-end" : "flex-start",
              },
            ]}
          >
            {/* 🔹 내 메시지에는 이름 안 보이게! */}
            <Text
              style={{
                color: isMe ? "#f9fafb" : TEXT_PRIMARY,
                fontSize: 14,
              }}
            >
              {item.text}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: BG }]}
      // ✅ iOS/Android 둘 다 padding 사용 + TabBar 높이만큼 offset
      behavior="padding"
      keyboardVerticalOffset={tabBarHeight}
    >
      <FlatList
        style={styles.list}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingTop: 8,
          paddingBottom: 8,
        }}
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted
        keyboardShouldPersistTaps="handled"
      />

      {/* ✅ TabBar에 딱 붙는 입력 영역 (여분 margin 없음) */}
      <View
        style={[
          styles.inputRow,
          {
            backgroundColor: INPUT_BG,
            borderTopColor: INPUT_BORDER,
          },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              borderColor: INPUT_BORDER,
              color: TEXT_PRIMARY,
            },
          ]}
          value={text}
          onChangeText={setText}
          placeholder="메시지를 입력하세요"
          placeholderTextColor={TEXT_SECONDARY}
          multiline
        />
        <TouchableOpacity
          onPress={sendMessage}
          activeOpacity={0.7}
          style={[
            styles.sendButton,
            {
              backgroundColor: text.trim()
                ? "#4f46e5"
                : isDark
                ? "#111827"
                : "#e5e7eb",
            },
          ]}
        >
          <Text
            style={{
              color: text.trim() ? "#ffffff" : TEXT_SECONDARY,
              fontWeight: "600",
              fontSize: 14,
            }}
          >
            전송
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
