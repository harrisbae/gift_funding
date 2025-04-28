# Header.js 변경 내용

## 개요
헤더 컴포넌트를 수정하여 로그인 상태에 따라 다른 UI를 제공하도록 업데이트했습니다.

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

### 2. 로그아웃 기능 구현
- 로그아웃 버튼 클릭 시 로컬 스토리지의 사용자 정보와 토큰을 제거합니다.

```jsx
const handleLogout = () => {
  // 로컬 스토리지에서 사용자 정보 및 토큰 제거
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  setUser(null);
  navigate('/');
  alert('로그아웃되었습니다.');
};
```

### 3. 조건부 렌더링 추가
- 로그인 상태에 따라 다른 UI를 렌더링합니다.
- 로그인 한 경우: 사용자 이름 표시 및 로그아웃 버튼
- 로그인 하지 않은 경우: 로그인/회원가입 링크

```jsx
{user ? (
  <>
    <li className="flex items-center">
      <span className="ml-2 font-semibold">{user.name}님</span>
    </li>
    <li>
      <button 
        onClick={handleLogout} 
        className="ml-4 px-4 py-1 bg-white text-primary rounded-md hover:bg-gray-100 transition-colors"
      >
        로그아웃
      </button>
    </li>
  </>
) : (
  <>
    <li><Link to="/login" className="hover:text-primary-light">로그인</Link></li>
    <li><Link to="/register" className="hover:text-primary-light">회원가입</Link></li>
  </>
)}
```

## 완성된 기능
1. 사용자 인증 상태 감지 및 관리
2. 로그인/로그아웃 UI 전환
3. 로그아웃 기능 