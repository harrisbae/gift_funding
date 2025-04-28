# 선물 펀딩 프로젝트

## 개요

Gift Funding 프로젝트는 Spring Boot 백엔드와 React 프론트엔드로 구성된 웹 애플리케이션입니다. 사용자가 선물 캠페인을 생성하고 자금을 모을 수 있는 플랫폼입니다.

## 프로젝트 구조
```
gift_funding/
├── back/          # Spring Boot 백엔드
└── front/         # React 프론트엔드
```

## 기능

- 사용자 등록 및 인증
- 선물 캠페인 생성
- 선물 캠페인에 기여하기
- 캠페인 진행 상황 추적

## 실행 방법

### 백엔드 (Spring Boot)
1. 백엔드 디렉토리로 이동
```bash
cd back
```

2. Maven Wrapper로 실행
```bash
./mvnw spring-boot:run
```

3. 백엔드 서버 정보
- 포트: 8080
- URL: `http://localhost:8080`
- H2 콘솔: `http://localhost:8080/h2-console`
  - JDBC URL: `jdbc:h2:mem:gift_funding`
  - 사용자명: `sa`
  - 비밀번호: `9491984f-413e-4fbd-aca0-a95fe3662fa9`

### 프론트엔드 (React)
1. 프론트엔드 디렉토리로 이동
```bash
cd front
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm start
```

4. 프론트엔드 서버 정보
- 기본 포트: 3000
- 대체 포트: 3002 (3000이 사용 중일 때)
- URL: `http://localhost:3000` 또는 `http://localhost:3002`

## 현재 상태

### 백엔드
- ✅ Spring Boot 애플리케이션 정상 실행 중
- ✅ H2 데이터베이스 초기화 완료
- ✅ 사용자 테이블 생성 및 제약조건 설정 완료
- ✅ JPA와 Spring Security 구성 완료
- ⚠️ 개발용 보안 설정 적용 중 (프로덕션 전 변경 필요)

### 프론트엔드
- ✅ React 개발 서버 실행 중
- ✅ 인증 시스템 구현 완료 (AuthContext)
- ⚠️ 메모리 부족으로 인한 빌드 실패 가능성 존재
- ⚠️ 포트 충돌 시 자동으로 대체 포트 사용

## 주의사항

### 백엔드
1. H2 콘솔은 개발 환경에서만 사용
2. 보안 설정이 완화되어 있으므로 프로덕션 배포 전 강화 필요
3. `spring.jpa.open-in-view` 경고 메시지 확인 필요

### 프론트엔드
1. 메모리 부족 문제 발생 시 Node.js 메모리 제한 조정 필요
2. 포트 3000이 사용 중일 경우 3002로 자동 전환됨
3. 개발 서버는 최적화되지 않은 상태로 실행됨

## 다음 단계
1. 프론트엔드 메모리 이슈 해결
2. 백엔드 보안 설정 강화
3. 캠페인 기능 구현
4. 프로덕션 빌드 최적화 