export const ML_QUESTIONS = [
  {
    id: "ml-1",
    question: "다음 중 지도학습(supervised learning)의 예시에 해당하는 것은?",
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
  {
    id: "ml-4",
    question:
      "다음 중 비지도학습(unsupervised learning)에 해당하는 알고리즘은?",
    choices: [
      "선형 회귀(Linear Regression)",
      "서포트 벡터 머신(SVM)",
      "K-평균 군집화(K-Means Clustering)",
      "로지스틱 회귀(Logistic Regression)",
    ],
    answerIndex: 2,
    explanation:
      "비지도학습은 정답 레이블 없이 데이터의 구조나 패턴을 찾는 학습 방식입니다. K-평균 군집화는 대표적인 비지도학습 알고리즘입니다.",
  },
  {
    id: "ml-5",
    question:
      "딥러닝에서 은닉층의 비선형성을 추가하여 모델의 표현력을 높이는 역할을 하는 것은?",
    choices: [
      "가중치(Weights)",
      "편향(Bias)",
      "손실 함수(Loss Function)",
      "활성화 함수(Activation Function)",
    ],
    answerIndex: 3,
    explanation:
      "활성화 함수는 신경망의 각 층 출력에 비선형 변환을 적용하여, 모델이 복잡한 패턴을 학습할 수 있게 합니다.",
  },
  {
    id: "ml-6",
    question:
      "여러 개의 결정 트리(Decision Tree)를 만들고, 이들의 예측을 다수결(voting)이나 평균을 통해 결합하여 최종 예측을 수행하는 앙상블 기법은?",
    choices: [
      "K-최근접 이웃(K-Nearest Neighbors)",
      "랜덤 포레스트(Random Forest)",
      "주성분 분석(PCA)",
      "그래디언트 부스팅(Gradient Boosting)",
    ],
    answerIndex: 1,
    explanation:
      "랜덤 포레스트는 배깅(Bagging)의 대표적인 예시로, 여러 결정 트리의 결과를 취합하여 과적합을 줄이고 성능을 향상시키는 앙상블 기법입니다.",
  },
  {
    id: "ml-7",
    question:
      "모델 학습 시, 손실 함수(Loss Function)의 값을 최소화하는 방향으로 모델의 파라미터를 업데이트하는 데 사용되는 최적화 알고리즘은?",
    choices: [
      "특이값 분해(SVD)",
      "경사 하강법(Gradient Descent)",
      "K-평균 군집화(K-Means Clustering)",
      "주성분 분석(PCA)",
    ],
    answerIndex: 1,
    explanation:
      "경사 하강법은 손실 함수의 기울기(경사)를 계산하여, 기울기가 낮아지는 방향(최소값)으로 가중치와 편향을 반복적으로 조정하는 알고리즘입니다.",
  },
  {
    id: "ml-8",
    question:
      "'성별', '혈액형'과 같이 순서가 없는 범주형(Categorical) 변수를 머신러닝 모델에 입력하기 위해 사용하는 기법으로 가장 적절한 것은?",
    choices: [
      "Min-Max 정규화",
      "로그 변환(Log Transformation)",
      "원-핫 인코딩(One-Hot Encoding)",
      "표준화(Standardization)",
    ],
    answerIndex: 2,
    explanation:
      "원-핫 인코딩은 범주형 변수의 각 고유 값(예: A형, B형)을 독립적인 이진 특성 벡터로 변환하여 모델이 범주의 관계를 잘못 해석하는 것을 방지합니다.",
  },
  {
    id: "ml-9",
    question:
      "강화학습(Reinforcement Learning)에서 에이전트(Agent)가 행동을 선택하는 기준으로, 장기적인 보상(Reward)을 최대화하도록 학습하는 함수는?",
    choices: [
      "비용 함수(Cost Function)",
      "가치 함수(Value Function)",
      "활성화 함수(Activation Function)",
      "잠재 함수(Latent Function)",
    ],
    answerIndex: 1,
    explanation:
      "가치 함수는 특정 상태나 상태-행동 쌍에서 에이전트가 앞으로 얻게 될 예상 보상의 합계를 나타내며, 에이전트는 이를 최대화하는 방향으로 학습합니다.",
  },
  {
    id: "ml-10",
    question:
      "이진 분류(Binary Classification) 문제에서, 실제 양성(Positive)인 샘플 중에서 모델이 정확하게 양성이라고 예측한 비율을 나타내는 평가지표는?",
    choices: [
      "정밀도(Precision)",
      "재현율(Recall)",
      "정확도(Accuracy)",
      "특이도(Specificity)",
    ],
    answerIndex: 1,
    explanation:
      "재현율(Recall)은 $TP / (TP + FN)$으로, '실제 양성'인 것들 중 '모델이 양성으로 맞춘' 비율입니다. 놓치면 안 되는 경우(예: 암 진단)에 중요합니다.",
  },
];
