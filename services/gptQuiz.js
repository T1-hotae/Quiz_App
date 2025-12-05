const WORKER_URL = "https://ai-quiz-gpt-proxy.hotae0321.workers.dev";

export async function fetchGptQuiz(options = {}) {
  const res = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      topic: options.topic || "신경망 기초 (퍼셉트론, 활성화 함수, 역전파)",
      numQuestions: options.numQuestions || 5,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate quiz");
  }

  const json = await res.json(); // { questions: [...] }
  return json.questions;
}
