# Login.js 변경 내용

## 개요
로그인 페이지 컴포넌트를 수정하여 백엔드 API 응답 형식에 맞게 로그인 로직을 업데이트했습니다.

## 주요 변경 사항

### 1. 로그인 응답 처리 로직 수정
- 백엔드의 응답 형식에 맞게 데이터 구조 접근 방식을 변경했습니다.
- 기존에는 `response.data.success`를 확인하여 로그인 성공 여부를 판단했지만, 백엔드에서 직접 `LoginResponse` 객체를 반환하도록 변경되어 이에 맞게 수정했습니다.

변경 전:
```jsx
// 로그인 API 호출
const response = await axios.post('http://localhost:8080/api/auth/login', formData);

// 로그인 성공 처리
if (response.data.success) {
  // 토큰과 사용자 정보 로컬 스토리지에 저장
  const userData = response.data.data;
  localStorage.setItem('token', userData.token);
  localStorage.setItem('user', JSON.stringify({
    id: userData.id,
    name: userData.name,
    email: userData.email
  }));
  
  // 성공 메시지
  alert(response.data.message || '로그인이 완료되었습니다!');
  
  // 메인 페이지로 이동
  navigate('/');
} else {
  setError(response.data.message || '로그인에 실패했습니다.');
}
```

변경 후:
```jsx
// 로그인 API 호출
const response = await axios.post('http://localhost:8080/api/auth/login', formData);

// 백엔드 응답은 LoginResponse 객체를 직접 반환함
// 토큰과 사용자 정보 로컬 스토리지에 저장
const userData = response.data;
localStorage.setItem('token', userData.token);
localStorage.setItem('user', JSON.stringify({
  id: userData.id,
  name: userData.name,
  email: userData.email
}));

// 성공 메시지
alert('로그인이 완료되었습니다!');

// 메인 페이지로 이동
navigate('/');
```

### 2. 오류 처리 개선
- 오류 처리 방식은 유지하되, 불필요한 조건문을 제거했습니다.
- 백엔드 API에서 오류가 발생할 경우 axios에서 자동으로 catch 블록으로 진입하므로 더 명확한 오류 처리가 가능합니다.

## 완성된 기능
1. 백엔드 API 응답 형식에 맞는 로그인 처리
2. 사용자 인증 정보(토큰, 사용자 정보) 로컬 스토리지 저장
3. 로그인 성공 시 메인 페이지 리다이렉트
4. 오류 메시지 표시 기능 