const functions = require("firebase-functions");
const OpenAI = require("openai");

const config = functions.config();
const openaiKey = config.openai && config.openai.key;
const openai = openaiKey ? new OpenAI({ apiKey: openaiKey }) : null;

// 🔹 더미 퀴즈 생성 함수
function makeMockQuiz(topic, numQuestions) {
  const items = [];
  for (let i = 0; i < numQuestions; i++) {
    items.push({
      id: i + 1,
      question: `[MOCK] ${topic} 관련 더미 문제 #${i + 1}`,
      choices: ["선택지 1", "선택지 2", "선택지 3", "선택지 4"],
      answerIndex: 1, // 0부터 시작
      explanation: "[MOCK] 정답 해설입니다.",
    });
  }
  return { topic, items };
}

exports.generateQuiz = functions.https.onCall(async (data, context) => {
  const { topic = "일반상식", numQuestions = 3 } = data || {};

  // 🔸 OpenAI 키 아예 없으면 -> 그냥 Mock 응답
  if (!openai) {
    console.warn("[generateQuiz] OpenAI key not set. Returning mock quiz.");
    return makeMockQuiz(topic, numQuestions);
  }

  try {
    // 🔹 여기에서 실제 OpenAI 호출 (쿼터 남아있을 때만 의미 있음)
    const completion = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `당신은 퀴즈 출제자입니다. 주제: ${topic} ...`,
    });

    // TODO: completion을 파싱해서 quizData 만들기
    const quizData = makeMockQuiz(topic, numQuestions); // 우선 임시로 더미 사용

    return quizData;
  } catch (err) {
    console.error("[generateQuiz] error:", err);

    // 🔸 쿼터 초과면 -> 그냥 Mock으로 내려주기 (500 안 던지고)
    if (err.code === "insufficient_quota" || err.status === 429) {
      console.warn(
        "[generateQuiz] OpenAI quota exceeded. Returning mock quiz instead."
      );
      return makeMockQuiz(topic, numQuestions);
    }

    // 🔸 진짜 다른 에러면 500 내보내기
    throw new functions.https.HttpsError("internal", "quiz_generation_failed");
  }
});
