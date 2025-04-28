# AuthServiceTest 테스트 결과 보고서

## 개요
`AuthService` 클래스의 테스트는 사용자 인증(로그인) 기능을 검증합니다.

## 테스트 환경
- **테스트 대상**: `AuthService`
- **테스트 프레임워크**: JUnit5
- **모킹 도구**: Mockito
- **의존성**: UserRepository, PasswordEncoder, JwtUtil

## 테스트 케이스

### 1. 로그인 성공 테스트 (testLoginSuccess)
- **목적**: 유효한 자격 증명으로 로그인이 성공적으로 처리되는지 확인
- **입력 데이터**:
  - 이메일: test@example.com
  - 비밀번호: password123
- **설정**:
  - UserRepository는 이메일로 사용자를 찾아 반환
  - PasswordEncoder가 비밀번호 일치를 확인
  - JwtUtil이 토큰을 생성
- **예상 결과**:
  - 성공적인 LoginResponse 반환:
    - id: 1
    - 이름: Test User
    - 이메일: test@example.com
    - 토큰: "sample.jwt.token"
- **결과**: 성공 ✅

### 2. 로그인 실패 - 존재하지 않는 이메일 (testLoginFailUserNotFound)
- **목적**: 존재하지 않는 이메일로 로그인 시 예외 발생 확인
- **입력 데이터**:
  - 이메일: nonexistent@example.com
  - 비밀번호: password123
- **설정**:
  - UserRepository가 null 반환 (사용자 미존재)
- **예상 결과**:
  - InvalidCredentialsException 예외 발생
  - 오류 메시지: "이메일 또는 비밀번호가 올바르지 않습니다"
- **결과**: 성공 ✅

### 3. 로그인 실패 - 잘못된 비밀번호 (testLoginFailWrongPassword)
- **목적**: 잘못된 비밀번호로 로그인 시 예외 발생 확인
- **입력 데이터**:
  - 이메일: test@example.com
  - 비밀번호: wrongpassword
- **설정**:
  - UserRepository는 사용자를 찾음
  - PasswordEncoder가 비밀번호 불일치 확인 (false 반환)
- **예상 결과**:
  - InvalidCredentialsException 예외 발생
  - 오류 메시지: "이메일 또는 비밀번호가 올바르지 않습니다"
- **결과**: 성공 ✅

## 테스트 요약
- **총 테스트 수**: 3
- **성공**: 3
- **실패**: 0

## 결론
`AuthService`의 로그인 기능은 모든 테스트 케이스에서 예상대로 동작합니다. 성공적인 로그인 시나리오와 다양한 실패 시나리오(존재하지 않는 이메일, 잘못된 비밀번호)를 모두 올바르게 처리합니다. 이를 통해 사용자 인증 시스템의 견고함을 확인할 수 있습니다. 