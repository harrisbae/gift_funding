# 선물 펀딩 프론트엔드

## 개요
선물 펀딩은 사용자들이 특별한 날을 위한 선물을 구매하기 위해 펀딩을 모을 수 있는 플랫폼입니다. 이 저장소는 선물 펀딩 웹 애플리케이션의 프론트엔드 부분입니다.

## 기술 스택
- **React**: 사용자 인터페이스 구축
- **React Router**: 클라이언트 사이드 라우팅
- **Axios**: API 통신
- **Tailwind CSS**: 스타일링

## 주요 기능

### 1. 사용자 인증
- 회원가입 및 로그인
- 로그인 상태 유지
- 로그아웃

### 2. 캠페인 관리
- 캠페인 목록 조회
- 캠페인 상세 정보 조회
- 캠페인 생성

## 파일 구조
```
frontend/
├── public/
├── src/
│   ├── components/       # 재사용 가능한 컴포넌트
│   ├── features/         # 기능별 모듈화된 코드
│   │   └── auth/         # 인증 관련 기능
│   ├── pages/            # 페이지 컴포넌트
│   ├── App.js            # 메인 앱 컴포넌트
│   ├── index.js          # 진입점
│   └── index.css         # 전역 스타일
└── package.json
```

## 최근 변경사항

### 1. 인증 기능 업데이트
- 헤더에 로그인 상태 표시 기능 추가
- 로그아웃 버튼 구현
- 홈 페이지에 개인화된 환영 메시지 추가
- 로그인 로직 백엔드 API 응답 형식에 맞게 수정

### 2. UI 개선
- 반응형 디자인 적용
- 사용자 피드백을 위한 알림 메시지 추가

## 시작하기

### 필수 조건
- Node.js 14.x 이상
- npm 또는 yarn

### 설치 및 실행
```bash
# 저장소 클론
git clone <repository_url>

# 디렉토리 이동
cd gift_funding/front

# 의존성 설치
npm install

# 개발 서버 실행
npm start
```

## API 연동
이 프론트엔드 애플리케이션은 백엔드 API와 통신합니다. 기본적으로 `http://localhost:8080`에서 실행되는 백엔드 서버에 연결하도록 구성되어 있습니다.

## 참고 문서
- [React 공식 문서](https://reactjs.org/docs/getting-started.html)
- [React Router 문서](https://reactrouter.com/web/guides/quick-start)
- [Tailwind CSS 문서](https://tailwindcss.com/docs) 