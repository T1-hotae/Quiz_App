import { NN_QUESTIONS } from "./nn_questions";
import { ML_QUESTIONS } from "./nn_questions";

export const QUIZZES = [
  {
    id: "NN",
    title: "신경망 퀴즈",
    description:
      "퍼셉트론, 활성화 함수, 역전파 등 신경망 기초를 묻는 퀴즈입니다.",
    questions: NN_QUESTIONS,
  },
  {
    id: "ML",
    title: "머신러닝 퀴즈",
    description:
      "지도학습, 과적합, 평가 지표 등 머신러닝 기초 개념 퀴즈입니다.",
    questions: ML_QUESTIONS,
  },
];
