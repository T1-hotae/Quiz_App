import { ScrollView, View, Text, Linking } from "react-native";
import { styles } from "../src/styles";

/** ✅ 블로그 화면: 외부 사이트 자동 열기 */
export default function AwardsScreen() {
  const posts = [
    { title: "백준 기본 문제 풀이법", tag: "Algorithm" },
    { title: "React 프레임워크 기록", tag: "Frontend" },
    { title: "TanStack Query와 Redux Toolkit", tag: "State Management" },
    { title: "FastAPI 기본", tag: "Backend" },
    { title: "Supabase 기초 다루기", tag: "Backend Tool" },
    { title: "TypeScirpt 문법 다루기", tag: "TypeScirpt" },
    { title: "ReactNative 최신 현황", tag: "ReactNative" },
    { title: "Neural Network 개념", tag: "AI" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.blogContainer}>
      <Text style={styles.blogTitle}>✍️ 블로그</Text>

      {posts.map((post, idx) => (
        <View key={idx} style={styles.blogCard}>
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.tag}>#{post.tag}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
