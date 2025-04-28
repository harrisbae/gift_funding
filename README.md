# Gift Funding 프로젝트

## 개요

Gift Funding 프로젝트는 Spring Boot 백엔드와 React 프론트엔드로 구성된 웹 애플리케이션입니다. 사용자가 선물 캠페인을 생성하고 자금을 모을 수 있는 플랫폼입니다.

## 프로젝트 구조

```
gift_funding/
├── back/          # Spring Boot 백엔드 애플리케이션
│   └── src/       # 소스 코드
│       ├── main/  # 메인 애플리케이션 코드
│       └── test/  # 테스트 코드
├── front/         # React 프론트엔드 애플리케이션
└── bin/           # 서버 실행 스크립트
    ├── start-backend.sh     # 백엔드 서버 실행
    ├── start-frontend.sh    # 프론트엔드 서버 실행
    └── start-all.sh         # 백엔드 및 프론트엔드 동시 실행
```

## 기능

- 사용자 등록 및 인증
- 선물 캠페인 생성
- 선물 캠페인에 기여하기
- 캠페인 진행 상황 추적

## 애플리케이션 실행 방법

### 스크립트로 실행 (권장)

서버를 쉽게 실행하기 위한 스크립트가 `bin` 디렉토리에 제공됩니다:

```bash
# 권한 부여 (최초 1회)
chmod +x bin/start-backend.sh bin/start-frontend.sh bin/start-all.sh

# 백엔드 서버만 실행
bin/start-backend.sh

# 프론트엔드 서버만 실행
bin/start-frontend.sh

# 백엔드 및 프론트엔드 동시 실행
bin/start-all.sh
```

### 수동 실행

#### 백엔드
```bash
cd back
./mvnw spring-boot:run
# 또는
mvn spring-boot:run
```

#### 프론트엔드
```bash
cd front
npm start
```

## 서버 접속 정보

- 프론트엔드: http://localhost:3000 또는 http://localhost:3002
- 백엔드 API: http://localhost:8080/api

### API 엔드포인트

- 회원가입: POST http://localhost:8080/api/auth/register
- 사용자 등록: POST http://localhost:8080/api/v1/users/register 