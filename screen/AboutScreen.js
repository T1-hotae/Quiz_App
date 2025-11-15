import { View, TouchableOpacity, Text } from "react-native";
import { styles } from "../src/styles";

// 드로어
export default function AboutScreen() {
  return (
    <View style={styles.container}>
      {/* 상단 로고 */}

      {/* 제목 */}
      <Text style={styles.title}>ℹ️ About This Site</Text>

      {/* 설명 */}
      <Text style={styles.description}>
        개발과 학습의 기록을 담은{"\n"}
        <Text style={{ fontWeight: "600" }}>개인 포트폴리오 & 블로그</Text>{" "}
        공간입니다.
        {"\n"}React · AI · 컴퓨터공학 관련{"\n"}생각과 프로젝트를 공유합니다.
      </Text>

      {/* 블로그 버튼 */}
      <TouchableOpacity style={styles.button} onPress={handleOpenBlog}>
        <Text style={styles.buttonText}>🌐 블로그 방문하기</Text>
      </TouchableOpacity>

      {/* 하단 슬로건 */}
      <Text style={styles.footer}>“작은 배움이 쌓여 큰 변화를 만든다.”</Text>
    </View>
  );
}
