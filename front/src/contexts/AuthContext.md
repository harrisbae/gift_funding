# AuthContext 구현

## 개요
애플리케이션 전체에서 로그인 상태를 공유하고 관리하기 위한 Context API 기반 인증 시스템입니다.

## 주요 기능

### 1. 전역 상태 관리
- 로그인 상태(사용자 정보)를 애플리케이션 전체에서 접근 가능하도록 합니다.
- `login`과 `logout` 함수를 통해 일관된 방식으로 인증 상태를 관리합니다.

### 2. 인증 상태 유지
- 페이지 새로고침 시에도 로컬 스토리지를 통해 로그인 상태를 유지합니다.
- 컴포넌트 마운트 시 자동으로 로컬 스토리지에서 사용자 정보를 불러옵니다.

## 구현 내용

```jsx
// AuthContext 생성
const AuthContext = createContext(null);

// AuthProvider 컴포넌트 정의
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 로컬 스토리지에서 사용자 정보 불러오기
  useEffect(() => {
    const loadUserFromStorage = () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    
    loadUserFromStorage();
  }, []);

  // 로그인 함수
  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify({
      id: userData.id,
      name: userData.name,
      email: userData.email
    }));
    setUser({
      id: userData.id,
      name: userData.name,
      email: userData.email
    });
  };

  // 로그아웃 함수
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  // AuthContext에서 제공할 값들
  const value = {
    user,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
```

## 사용 방법

### 애플리케이션에 적용
```jsx
// App.js
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* 나머지 컴포넌트들 */}
      </Router>
    </AuthProvider>
  );
}
```

### 컴포넌트에서 사용
```jsx
// 컴포넌트
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, login, logout } = useAuth();
  
  // user가 있으면 로그인 상태
  return (
    <div>
      {user ? (
        <p>안녕하세요, {user.name}님!</p>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  );
}
```

## 개선된 로그인 흐름

1. 사용자가 로그인 정보 입력 후 제출
2. 백엔드 API에서 인증 확인 및 JWT 토큰 발급
3. `login` 함수 호출 (전역 상태 업데이트 및 로컬 스토리지 저장)
4. 헤더를 포함한 모든 컴포넌트에서 즉시 로그인 상태 반영
5. 로그아웃 시 `logout` 함수 호출로 모든 컴포넌트에 반영 