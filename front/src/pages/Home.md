# Home.js 변경 내용

## 개요
홈 페이지 컴포넌트를 수정하여 로그인한 사용자를 위한 개인화된 메시지를 표시하도록 업데이트했습니다.

## 주요 변경 사항

### 1. 상태 관리 추가
- `useState`와 `useEffect` Hook을 사용하여 로그인 상태를 관리합니다.
- 로컬 스토리지에서 사용자 정보를 불러와 상태에 저장합니다.

```jsx
const [user, setUser] = useState(null);

useEffect(() => {
  // 로컬 스토리지에서 사용자 정보 가져오기
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);
```

### 2. 환영 메시지 개인화
- 로그인 상태에 따라 개인화된 환영 메시지를 표시합니다.
- 로그인한 경우 사용자 이름을 메시지에 포함시킵니다.

```jsx
<h1 className="text-4xl md:text-5xl font-bold mb-4">
  {user ? `${user.name}님, ` : ''}선물로 특별한 순간을 만들어보세요
</h1>
```

## 완성된 기능
1. 사용자 인증 상태 감지
2. 개인화된 환영 메시지 표시
3. 로컬 스토리지 활용한 사용자 세션 유지 