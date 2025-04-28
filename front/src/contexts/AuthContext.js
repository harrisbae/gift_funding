import React, { createContext, useState, useEffect, useContext } from 'react';

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

// 커스텀 훅으로 AuthContext 사용을 더 쉽게 만듦
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 