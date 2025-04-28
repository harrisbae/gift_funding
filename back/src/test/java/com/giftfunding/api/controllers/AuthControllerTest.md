# AuthControllerTest 테스트 결과 보고서

## 개요
`AuthController` 클래스의 테스트는 사용자 인증 관련 기능(로그인)을 검증합니다.

## 테스트 환경
- **테스트 대상**: `AuthController`
- **테스트 프레임워크**: JUnit5, Spring Boot Test
- **모킹 도구**: Mockito

## 테스트 케이스

### 1. 로그인 성공 테스트 (testLoginSuccess)
- **목적**: 유효한 인증 정보로 로그인 요청 시 성공적으로 처리되는지 확인
- **입력 데이터**:
  - 이메일: test@example.com
  - 비밀번호: password123
  - 로그인 유지: false
- **예상 결과**:
  - 상태 코드: 200 (OK)
  - 응답 내용:
    - id: 1
    - name: 테스트 사용자
    - email: test@example.com
    - token: test-token-12345
- **결과**: 성공 ✅

### 2. 로그인 실패 - 잘못된 인증 정보 (testLoginFailInvalidCredentials)
- **목적**: 잘못된 인증 정보로 로그인 시 적절한 오류 응답을 반환하는지 확인
- **입력 데이터**:
  - 이메일: wrong@example.com
  - 비밀번호: wrongpassword
  - 로그인 유지: false
- **예상 결과**:
  - 상태 코드: 401 (Unauthorized)
  - 오류 메시지: "이메일 또는 비밀번호가 올바르지 않습니다."
- **결과**: 성공 ✅

### 3. 서버 에러 테스트 (testLoginFailServerError) - 현재 스킵됨
- **목적**: 서버 내부 오류 발생 시 적절한 응답을 반환하는지 확인
- **설명**: 현재 구현에서는 테스트를 스킵하고 있으며, 필요시 활성화하여 테스트할 수 있습니다.

## 테스트 요약
- **총 테스트 수**: 2 (1개 스킵됨)
- **성공**: 2
- **실패**: 0
- **스킵**: 1

## 결론
`AuthController`의 로그인 기능은 성공 및 실패 케이스에 대해 적절히 동작하며, 예상된 결과를 반환합니다. 이는 사용자 인증 시스템이 예상대로 기능하고 있음을 확인합니다. 