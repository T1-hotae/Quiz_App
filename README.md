# 리액트 네이티브 퀴즈 앱

FastAPI 백엔드와 연동하는 **React Native 기반 퀴즈 앱**입니다.  
현재는 **Firebase 인증(회원가입/로그인/로그아웃)**까지 구현되어 있으며,  
앞으로 **퀴즈 플레이 화면**과 **Awards(보상 시스템)**를 확장 개발할 예정입니다.

초기 버전은 **JavaScript**로 작성했으며,  
이후 점진적으로 **TypeScript(`.tsx`)로 마이그레이션**하는 연습도 진행할 계획입니다.

> ⚙️ Expo, Firebase, React Navigation 등 의존성 때문에 초기 세팅이 꽤 빡셌습니다…

## 환경 세팅 및 설치 방법

```
npm i
```

를 하면 package가 설치됩니다.

---

## 주요 기능

- Firebase 이메일/비밀번호 기반 **회원가입 / 로그인 / 로그아웃**
- **로그인 상태에 따른 화면 분기**
  - 비로그인: 로그인 / 회원가입 화면
  - 로그인: 메인 Drawer & 탭 화면
- 하단 탭 구성: **Awards / Home / Profile**
- 퀴즈 리스트 / 상세 / 풀이 화면을 위한 **Stack 네비게이션 구조 설계** (개발 진행 중)

---

## 폴더/파일 구조 개요

- `App.js`
- `router.js`
- `src/lib/auth-provider`
- `Firebase/firebase.js`
- `AppDrawer.js`
- `MainTabs.js`
- `Awards.js`
- `Profile.js`
- `QuizStack.js`
- `quizzes.js`

---

## App 전체 흐름

### `App.js`

- `KeyboardAvoidingView`와 `AuthProvider`가 **Router를 감싸는 구조**입니다.
- 인증 컨텍스트는 `./src/lib/auth-provider`에 정의되어 있습니다.
- Firebase를 이용해 **회원가입, 로그인, 로그아웃** 로직을 제공합니다.

예시 구조:

```jsx
<AuthProvider>
  <KeyboardAvoidingView>
    <Router />
  </KeyboardAvoidingView>
</AuthProvider>
```

### `router.js`

- **로그인 상태에 따라** 다른 화면으로 라우팅합니다.

- 로그인 ✅  
  → `AppDrawer`로 이동

- 로그인 ❌  
  → `LoginScreen` 또는 `RegisterScreen`으로 이동

---

## 인증 구조

1. **`Firebase/firebase.js`**

   - Firebase 설정 및 `auth` 인스턴스를 초기화합니다.

2. **`src/lib/auth-provider`**

   - `useAuth` 훅에서 **회원가입 / 로그인 / 로그아웃** 로직을 구현합니다.
   - `AuthProvider`를 통해 전역에 인증 상태를 제공합니다.

3. **`LoginScreen` / `RegisterScreen`**
   - 위의 `useAuth`를 사용해 실제 **폼 입력 + 인증 요청**을 처리합니다.

---

## 네비게이션 구성

### `AppDrawer.js`

- Drawer 네비게이션의 루트 역할을 합니다.
- 포함:
  - `MainTabs` (하단 탭)
  - `Logout` 버튼 (로그아웃 기능)

---

### `MainTabs.js`

하단 탭 3개로 구성되어 있습니다.

- `Awards`
- `Home`
- `Profile`

각 탭은 독립적인 화면 또는 Stack과 연결될 수 있습니다.

---

### `Awards.js`

- **보상(Awards) 관련 UI**가 구현된 화면입니다.
- 퀴즈 결과나 업적/점수를 시각화하는 용도로 확장할 예정입니다.

---

### `Profile.js`

- 사용자 **프로필 정보**를 보여주는 화면입니다.
- 추후 닉네임 변경, 아바타 설정 등의 기능을 추가할 수 있습니다.

---

## 퀴즈 관련 구조

### `QuizStack.js`

실제 퀴즈를 풀기 위한 **Stack 네비게이션**입니다.

- `List`  
  → 전체 퀴즈 **리스트 화면**

- `Detail`  
  → 선택한 퀴즈에 대한 **상세 정보 화면**

- `Screen`  
  → 실제 퀴즈를 풀고 정답을 체크하는 **퀴즈 풀이 화면**

---

### `quizzes.js`

- `QUIZZES` 상수에 **퀴즈 데이터**를 정의해두었습니다.
- 각 스크린에서 이 데이터를 사용해 문제를 출제합니다.

```js
export const QUIZZES = [
  {
    id: 1,
    title: "예시 퀴즈",
    questions: [
      // ...
    ],
  },
  // ...
];
```
