import { View, Text, Button } from "react-native";

export default function ProjectDetail({ route, navigation }) {
  const { id } = route.params ?? {};
  return (
    <View style={{ flex: 1, padding: 24, gap: 12, backgroundColor: "#fff" }}>
      <Text style={{ fontSize: 24 }}>
        {id === "A" ? "모요 프로젝트" : "크로스플랫폼 앱개발"}
      </Text>
      {id === "A" ? (
        <>
          <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: "bold" }}>개요:</Text>
            <Text>
              게시글 피드 및 채팅을 할 수 있는 커뮤니티 사이트 개발이다.
            </Text>
            <Text></Text>
            <Text style={{ fontWeight: "bold" }}>기술 스택:</Text>
            <Text>프레임워크: React.js (TypeScirpt) </Text>
            <Text>상태관리 툴: TanStackQuery, ReduxToolkit</Text>
          </View>
        </>
      ) : (
        <>
          <View style={{ padding: 10 }}>
            <Text style={{ fontWeight: "bold" }}>개요:</Text>
            <Text>나의 포트폴리오를 나열하는 앱 개발이다.</Text>
            <Text></Text>
            <Text style={{ fontWeight: "bold" }}>기술 스택:</Text>
            <Text>프레임워크: ReactNative </Text>
            <Text>상태관리 툴: React 상태관리 </Text>
          </View>
        </>
      )}

      <Button title="뒤로" onPress={() => navigation.goBack()} />
    </View>
  );
}
