import { StyleSheet } from "react-native";

export const chatStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  messageRow: {
    width: "100%",
    flexDirection: "row",
    marginVertical: 4,
  },
  // 🔹 이름 + 말풍선 묶는 래퍼
  messageWrapper: {
    maxWidth: "75%",
  },
  messageBubble: {
    maxWidth: "100%",
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 16,
  },
  bubbleMe: {
    borderTopRightRadius: 4,
    borderTopLeftRadius: 16,
  },
  bubbleOther: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 4,
  },
  userName: {
    fontSize: 10,
  },
  inputRow: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 8,
    marginRight: 8,
    fontSize: 14,
  },
  sendButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
});
