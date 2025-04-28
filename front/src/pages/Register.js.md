# Register.js 컴포넌트

## 개요
`Register.js`는 선물 펀딩 플랫폼의 회원가입 페이지를 구현한 React 컴포넌트입니다. 이 컴포넌트는 사용자로부터 회원 정보를 입력받고 유효성을 검사한 후 회원가입 요청을 처리합니다.

## 주요 기능
- 사용자 정보 입력 폼 제공 (이름, 이메일, 비밀번호, 비밀번호 확인)
- 실시간 유효성 검사 및 피드백
- 약관 동의 체크 기능
- 폼 제출 처리 및 API 연동 준비

## 컴포넌트 구조

### 상태 관리
```jsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false
});
  
const [errors, setErrors] = useState({});
```

- `formData`: 사용자 입력 데이터 저장
- `errors`: 유효성 검사 오류 메시지 관리

### 주요 함수

#### handleChange
사용자 입력이 변경될 때마다 호출되어 상태를 업데이트합니다.
```jsx
const handleChange = (e) => {
  const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
  setFormData({
    ...formData,
    [e.target.name]: value
  });
};
```

#### validate
폼 제출 전 모든 입력 필드의 유효성을 검사합니다.
```jsx
const validate = () => {
  const newErrors = {};
  
  // 이름 검사
  if (!formData.name) {
    newErrors.name = '이름을 입력해주세요';
  }
  
  // 이메일 검사
  if (!formData.email) {
    newErrors.email = '이메일을 입력해주세요';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = '유효한 이메일 주소를 입력해주세요';
  }
  
  // 비밀번호 검사
  if (!formData.password) {
    newErrors.password = '비밀번호를 입력해주세요';
  } else if (formData.password.length < 6) {
    newErrors.password = '비밀번호는 6자 이상이어야 합니다';
  }
  
  // 비밀번호 확인 검사
  if (formData.password !== formData.confirmPassword) {
    newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
  }
  
  // 약관 동의 검사
  if (!formData.agreeTerms) {
    newErrors.agreeTerms = '이용약관에 동의해주세요';
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

#### handleSubmit
폼 제출 시 호출되어 유효성 검사를 실행하고, 유효한 경우 회원가입 처리를 수행합니다.
```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  
  if (validate()) {
    // API 호출로 회원가입을 처리해야 합니다
    console.log('회원가입 시도:', formData);
    alert('회원가입이 완료되었습니다! (테스트)');
  }
};
```

## 유효성 검사 규칙
- **이름**: 필수 입력
- **이메일**: 필수 입력, 이메일 형식 검사
- **비밀번호**: 필수 입력, 최소 6자 이상
- **비밀번호 확인**: 비밀번호와 일치
- **약관 동의**: 필수 체크

## UI 구성
- 사용자 친화적인 입력 폼
- 오류 메시지 실시간 표시
- 로그인 페이지 링크 제공

## 스타일
- Tailwind CSS 기반 디자인
- 반응형 레이아웃
- 오류 상태에 따른 시각적 피드백

## 확장 가능성
- 소셜 로그인 추가
- 추가 사용자 정보 필드 확장
- 다단계 회원가입 프로세스 구현

## 개발 노트
- 현재는 API 연동 없이 프론트엔드만 구현된 상태
- 실제 서비스에서는 백엔드 API와 연동하여 회원가입 처리 필요
- 보안을 위해 HTTPS 통신 및 CSRF 토큰 적용 필요 