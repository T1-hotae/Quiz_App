// src/data/quizzes.js 같은 파일로 빼도 좋아요
export const QUIZZES = [
  {
    id: "NN",
    title: "신경망 퀴즈",
    description:
      "퍼셉트론, 활성화 함수, 역전파 등 신경망 기초를 묻는 퀴즈입니다.",
    questions: [
      {
        id: "nn-1",
        question: "다층 퍼셉트론(MLP)에 대한 설명으로 옳지 않은 것은?",
        choices: [
          "하나 이상의 은닉층을 가진 신경망을 의미한다.",
          "비선형 활성화 함수가 없어도 XOR 문제를 풀 수 있다.",
          "역전파 알고리즘으로 가중치를 학습시킬 수 있다.",
          "입력층-은닉층-출력층 구조를 가질 수 있다.",
        ],
        answerIndex: 1,
        explanation:
          "XOR 문제를 풀려면 비선형성을 주는 활성화 함수가 필요합니다. 비선형 함수 없이 선형 변환만 반복하면 결국 하나의 선형 변환과 같아집니다.",
      },
      {
        id: "nn-2",
        question:
          "다음 중 활성화 함수(activation function)의 주된 역할은 무엇인가?",
        choices: [
          "가중치를 초기화하는 역할",
          "입력 데이터를 정규분포로 변환하는 역할",
          "비선형성을 부여하여 복잡한 함수를 근사하도록 하는 역할",
          "학습률(learning rate)을 자동으로 조정하는 역할",
        ],
        answerIndex: 2,
        explanation:
          "활성화 함수는 신경망에 비선형성을 부여하여 복잡한 패턴을 학습할 수 있게 합니다.",
      },
      {
        id: "nn-3",
        question: "역전파(backpropagation)에 대한 설명으로 가장 알맞은 것은?",
        choices: [
          "출력층에서 입력층 방향으로 오차의 기울기를 전파하며 가중치를 업데이트하는 알고리즘이다.",
          "입력층에서 출력층 방향으로 가중치를 무작위로 초기화하는 알고리즘이다.",
          "손실 함수의 값을 0으로 만드는 가중치를 직접 계산하는 해석적 방법이다.",
          "학습 데이터를 무작위로 섞는 데이터 증강 기법이다.",
        ],
        answerIndex: 0,
        explanation:
          "역전파는 출력층에서 계산된 손실의 기울기를 체인 룰로 역으로 전파하면서 각 층의 가중치에 대한 기울기를 구하는 알고리즘입니다.",
      },
    ], // 나중에 여기다 Q&A 넣기
  },
  {
    id: "ML",
    title: "머신러닝 퀴즈",
    description:
      "지도학습, 과적합, 평가 지표 등 머신러닝 기초 개념 퀴즈입니다.",
    questions: [
      {
        id: "ml-1",
        question:
          "다음 중 지도학습(supervised learning)의 예시에 해당하는 것은?",
        choices: [
          "라벨이 없는 뉴스 기사들을 비슷한 주제끼리 묶는 뉴스 클러스터링",
          "입력 이미지와 정답 레이블(고양이/개)이 함께 주어지는 이미지 분류",
          "고차원 데이터의 차원을 줄이는 PCA",
          "단어들 사이의 유사도를 기반으로 임베딩을 학습하는 Word2Vec",
        ],
        answerIndex: 1,
        explanation:
          "지도학습은 입력과 정답 레이블이 쌍으로 주어지는 학습 방식입니다. 이미지 분류는 전형적인 지도학습 예제입니다.",
      },
      {
        id: "ml-2",
        question: "과적합(overfitting)을 줄이기 위한 방법이 아닌 것은?",
        choices: [
          "학습 데이터 양을 늘린다.",
          "정규화(regularization)를 적용한다.",
          "모델의 복잡도를 줄인다.",
          "훈련 데이터와 테스트 데이터를 완전히 섞어서 함께 학습한다.",
        ],
        answerIndex: 3,
        explanation:
          "테스트 데이터는 일반화 성능을 평가하기 위해 따로 남겨둬야 합니다. 같이 학습하면 과적합이 심해집니다.",
      },
      {
        id: "ml-3",
        question:
          "다음 중 분류(classification) 문제에서 자주 사용하는 평가지표가 아닌 것은?",
        choices: [
          "정확도(Accuracy)",
          "정밀도(Precision)와 재현율(Recall)",
          "F1-score",
          "평균제곱오차(Mean Squared Error, MSE)",
        ],
        answerIndex: 3,
        explanation:
          "MSE는 주로 회귀(regression) 문제에서 사용하는 평가지표입니다.",
      },
    ],
  },
];
