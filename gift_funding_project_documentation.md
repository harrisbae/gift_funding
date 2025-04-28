# 선물 펀딩 프로젝트

선물 펀딩 프로젝트는 사용자가 선물 캠페인을 생성하고 자금을 모을 수 있는 플랫폼입니다. 이 프로젝트는 React 프론트엔드와 Java Spring Boot 백엔드로 구성된 풀스택 애플리케이션입니다.

## 프로젝트 구조

```
gift_funding/
├── back/                 # 백엔드 (Java/Spring Boot)
│   ├── src/              # 소스 코드
│   │   ├── main/
│   │   │   ├── java/com/giftfunding/api/
│   │   │   │   ├── config/            # 설정 클래스
│   │   │   │   ├── controllers/       # API 컨트롤러
│   │   │   │   ├── dto/               # 데이터 전송 객체
│   │   │   │   ├── models/            # 엔티티 모델
│   │   │   │   ├── repositories/      # 데이터 접근 계층
│   │   │   │   ├── services/          # 비즈니스 로직
│   │   │   │   └── GiftFundingApiApplication.java
│   │   │   └── resources/
│   │   │       └── application.properties  # 애플리케이션 설정
│   │   └── test/         # 테스트 코드
│   ├── .mvn/             # Maven 래퍼 설정
│   ├── pom.xml           # Maven 의존성 관리
│   └── mvnw              # Maven 래퍼 스크립트
└── front/                # 프론트엔드 (React)
    ├── public/           # 정적 파일
    ├── src/              # 소스 코드
    │   ├── components/   # 재사용 가능한 컴포넌트
    │   ├── pages/        # 페이지 컴포넌트
    │   │   ├── Home.js            # 홈 페이지
    │   │   ├── CampaignList.js    # 캠페인 목록 페이지
    │   │   ├── CampaignDetail.js  # 캠페인 상세 페이지
    │   │   ├── CreateCampaign.js  # 캠페인 생성 페이지
    │   │   ├── Login.js           # 로그인 페이지
    │   │   └── Register.js        # 회원가입 페이지
    │   ├── App.js        # 메인 애플리케이션 컴포넌트
    │   ├── index.js      # 애플리케이션 진입점
    │   └── index.css     # 글로벌 스타일
    ├── package.json      # npm 의존성 관리
    └── tailwind.config.js # Tailwind CSS 설정
```

## 기술 스택

### 프론트엔드
- **React**: 사용자 인터페이스 구축
- **React Router**: 클라이언트 사이드 라우팅
- **Axios**: HTTP 클라이언트
- **Tailwind CSS**: 스타일링

### 백엔드
- **Java**: 프로그래밍 언어
- **Spring Boot**: 애플리케이션 프레임워크
- **Spring Security**: 인증 및 권한 부여
- **Spring Data JPA**: 데이터 접근
- **H2 Database**: 인메모리 데이터베이스
- **Lombok**: 보일러플레이트 코드 감소
- **JWT**: 토큰 기반 인증

## 주요 기능

1. **회원 관리**
   - 회원가입
   - 로그인/로그아웃
   - 프로필 관리

2. **캠페인 관리**
   - 캠페인 생성
   - 캠페인 목록 조회
   - 캠페인 상세 정보 조회
   - 캠페인 검색

3. **후원 관리**
   - 캠페인 후원
   - 후원 내역 조회

## API 엔드포인트

### 인증 API
- `POST /api/auth/register`: 회원가입
- `POST /api/auth/login`: 로그인

### 캠페인 API
- `GET /api/campaigns`: 캠페인 목록 조회
- `GET /api/campaigns/{id}`: 캠페인 상세 조회
- `POST /api/campaigns`: 캠페인 생성
- `PUT /api/campaigns/{id}`: 캠페인 수정
- `DELETE /api/campaigns/{id}`: 캠페인 삭제

### 후원 API
- `POST /api/donations`: 후원 생성
- `GET /api/donations/user/{userId}`: 사용자별 후원 내역 조회
- `GET /api/donations/campaign/{campaignId}`: 캠페인별 후원 내역 조회

## 개발 환경 설정

### 프론트엔드
1. 프론트엔드 디렉토리로 이동
   ```
   cd front
   ```

2. 의존성 설치
   ```
   npm install
   ```

3. 개발 서버 실행
   ```
   npm start
   ```
   
4. 브라우저에서 `http://localhost:3000` 접속

### 백엔드
1. 백엔드 디렉토리로 이동
   ```
   cd back
   ```

2. Maven으로 빌드 및 실행
   ```
   ./mvnw spring-boot:run
   ```
   
3. API 서버는 `http://localhost:8080`에서 실행됨

## 배포 방법

### 프론트엔드
```
cd front
npm run build
```
빌드된 파일은 `front/build` 디렉토리에 생성됩니다.

### 백엔드
```
cd back
./mvnw clean package
```
JAR 파일은 `back/target` 디렉토리에 생성됩니다.

## 데이터베이스 스키마

### Users 테이블
| 필드        | 타입         | 설명            |
|------------|--------------|-----------------|
| id         | Long         | 고유 식별자      |
| name       | String       | 사용자 이름      |
| email      | String       | 이메일 주소      |
| password   | String       | 암호화된 비밀번호 |
| created_at | Timestamp    | 생성 시간        |
| updated_at | Timestamp    | 수정 시간        |

### Campaigns 테이블 (향후 개발)
| 필드         | 타입         | 설명            |
|-------------|--------------|-----------------|
| id          | Long         | 고유 식별자      |
| title       | String       | 캠페인 제목      |
| description | Text         | 캠페인 설명      |
| goal_amount | Decimal      | 목표 금액        |
| end_date    | Date         | 종료일          |
| user_id     | Long         | 생성자 ID       |
| created_at  | Timestamp    | 생성 시간        |
| updated_at  | Timestamp    | 수정 시간        |

### Donations 테이블 (향후 개발)
| 필드         | 타입         | 설명            |
|-------------|--------------|-----------------|
| id          | Long         | 고유 식별자      |
| amount      | Decimal      | 후원 금액        |
| message     | String       | 후원 메시지      |
| user_id     | Long         | 후원자 ID       |
| campaign_id | Long         | 캠페인 ID       |
| created_at  | Timestamp    | 생성 시간        |

## 문제 해결 과정

### 1. 프론트엔드 실행 오류
- **문제**: 루트 디렉토리에서 `npm start` 명령 실행 시 package.json을 찾을 수 없음
- **해결**: `cd front && npm start` 명령으로 올바른 디렉토리에서 실행

### 2. 백엔드 서버 설정 및 실행 오류
- **문제**: Maven 래퍼가 없어 빌드 불가
- **해결**: 
  - `.mvn/wrapper` 디렉토리 및 필요한 파일 생성
  - Maven 래퍼 스크립트 `mvnw` 생성
  - 실행 권한 부여 (`chmod +x mvnw`)

### 3. Spring Boot 버전 문제
- **문제**: Spring Security 설정과 Spring Boot 버전 간 호환성 이슈
- **해결**: 
  - Spring Boot 버전을 3.2.0에서 2.7.0으로 변경
  - Spring Security 설정을 WebSecurityConfigurerAdapter 상속 방식으로 변경

### 4. 데이터베이스 연결 문제
- **문제**: MySQL 의존성 관련 이슈
- **해결**: H2 인메모리 데이터베이스로 전환

## 향후 개발 계획

1. **캠페인 기능 구현**
   - 캠페인 생성, 조회, 수정, 삭제 API 개발
   - 캠페인 관련 UI 구현

2. **후원 기능 구현**
   - 결제 시스템 연동
   - 후원 내역 관리 기능

3. **사용자 프로필 기능**
   - 프로필 수정
   - 내 캠페인/후원 내역 조회

4. **알림 시스템**
   - 이메일 알림
   - 실시간 알림

5. **소셜 기능**
   - 소셜 미디어 공유
   - 소셜 로그인

## 라이선스

MIT 