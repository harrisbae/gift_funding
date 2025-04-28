# Gift Funding 프로젝트 테스트 문서

## 1. 테스트 개요

이 문서는 Gift Funding 프로젝트의 테스트 내용과 문제 해결 과정을 상세히 기술합니다. 프로젝트는 Spring Boot 백엔드를 사용하며, 다양한 테스트가 구현되어 있습니다.

## 2. 테스트 구조

```
back/src/test/java/com/giftfunding/api/
├── controllers/         # 컨트롤러 테스트
│   ├── AuthControllerTest.java
│   └── UserControllerTest.java
├── dto/                 # DTO 검증 테스트
│   └── RegisterRequestTest.java
└── services/            # 서비스 레이어 테스트
    └── UserServiceTest.java
```

## 3. 주요 문제 및 해결 과정

### 3.1. User 클래스 중복 문제

#### 문제
- `entities` 패키지와 `models` 패키지에 동일한 User 클래스가 중복 존재
- 이로 인해 일부 테스트에서 의존성 주입 오류 발생
- `AuthControllerTest`에서 `User` 클래스의 참조가 모호해짐

#### 해결 방법
- `models.User` 클래스 삭제
- 모든 참조를 `entities.User`로 통합
- 삭제된 파일: `back/src/main/java/com/giftfunding/api/models/User.java`

#### 코드 변경 예시
```java
// 변경 전 (모호한 import)
import com.giftfunding.api.models.User;
// 또는
import com.giftfunding.api.entities.User;

// 변경 후 (명확한 import)
import com.giftfunding.api.entities.User;
```

### 3.2. 인증 관련 테스트 실패

#### 문제
- `UserControllerTest`에서 Spring Security로 인한 403 Access Denied 오류 발생
- 테스트 환경에서 인증되지 않은 사용자로 간주되어 보안 필터에 의해 요청이 차단됨

#### 시도한 접근법 1: TestSecurityConfig 클래스 생성
- `TestSecurityConfig` 클래스를 생성하여 테스트 환경에서 보안 설정을 변경하려고 시도
- Bean 충돌 발생 (`WebSecurityConfigurerAdapter`와 `SecurityFilterChain` 간의 충돌)
- 이 방법은 제거함 (삭제된 파일: `back/src/test/java/com/giftfunding/api/config/TestSecurityConfig.java`)

#### 최종 해결법
- `@WebMvcTest` 대신 `@SpringBootTest`와 `@AutoConfigureMockMvc` 어노테이션 사용
- `@WithMockUser` 어노테이션 추가하여 인증된 사용자 모의
- CSRF 토큰 추가 (`SecurityMockMvcRequestPostProcessors.csrf()`)

#### 코드 변경 예시
```java
// 변경 전 (테스트 실패)
@WebMvcTest(UserController.class)
class UserControllerTest {
    // ...
    
    @Test
    void testRegisterUserSuccess() throws Exception {
        mockMvc.perform(post("/api/v1/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated());
    }
}

// 변경 후 (테스트 성공)
@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser
class UserControllerTest {
    // ...
    
    @Test
    void testRegisterUserSuccess() throws Exception {
        mockMvc.perform(post("/api/v1/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isCreated());
    }
}
```

### 3.3. 유효성 검증 오류 처리

#### 문제
- Bean Validation 실패 시 적절한 오류 메시지가 클라이언트에 전달되지 않음
- 테스트에서 예상한 오류 메시지와 실제 응답이 일치하지 않음

#### 해결 방법
- `UserController`에 `MethodArgumentNotValidException` 핸들러 추가
- 유효성 검증 실패 시 첫 번째 오류 메시지를 추출하여 클라이언트에 전달

#### 구현 코드
```java
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ApiResponse<?>> handleValidationExceptions(MethodArgumentNotValidException ex) {
    Map<String, String> errors = new HashMap<>();
    ex.getBindingResult().getAllErrors().forEach((error) -> {
        String fieldName = ((FieldError) error).getField();
        String errorMessage = error.getDefaultMessage();
        errors.put(fieldName, errorMessage);
    });
    
    String errorMessage = "입력값 검증에 실패했습니다.";
    if (!errors.isEmpty()) {
        errorMessage = errors.values().iterator().next(); // 첫 번째 오류 메시지 사용
    }
    
    return ResponseEntity.status(HttpStatus.BAD_REQUEST)
            .body(ApiResponse.error(errorMessage));
}
```

### 3.4. 테스트 오류 메시지 언어 불일치

#### 문제
- 테스트에서는 영어 오류 메시지를 기대하지만, 실제 애플리케이션은 한국어 메시지 반환
- `testRegisterUserFailInvalidInput` 테스트에서 "Name cannot be empty" 메시지 대신 "이름은 필수 입력값입니다" 메시지가 반환됨

#### 해결 방법
- 테스트 코드의 기대 메시지를 실제 애플리케이션 메시지("이름은 필수 입력값입니다")와 일치하도록 수정

#### 코드 변경 예시
```java
// 변경 전 (테스트 실패)
.andExpect(jsonPath("$.message", is("Name cannot be empty")));

// 변경 후 (테스트 성공)
.andExpect(jsonPath("$.message", is("이름은 필수 입력값입니다.")));
```

## 4. 테스트 결과

모든 테스트가 성공적으로 통과되었습니다:

- `RegisterRequestTest`: 5개 테스트
  - `testValidRegisterRequest`: 유효한 회원가입 요청 검증
  - `testInvalidEmail`: 유효하지 않은 이메일 검증
  - `testEmptyName`: 빈 이름 필드 검증
  - `testShortPassword`: 짧은 비밀번호 검증
  - `testNullFields`: Null 필드 검증

- `UserControllerTest`: 4개 테스트
  - `testRegisterUserSuccess`: 회원가입 성공 테스트
  - `testRegisterUserFailDuplicateEmail`: 중복 이메일 처리 테스트
  - `testRegisterUserFailInvalidInput`: 유효하지 않은 입력 처리 테스트
  - `testRegisterUserFailValidation`: 유효성 검증 실패 테스트

- `AuthControllerTest`: 3개 테스트
  - `testRegisterSuccess`: 회원가입 API 성공 테스트
  - `testRegisterFailDuplicateEmail`: 중복 이메일 API 테스트
  - `testRegisterFailValidation`: 유효성 검증 API 테스트

- `UserServiceTest`: 3개 테스트
  - `testRegisterUserSuccess`: 사용자 등록 서비스 성공 테스트
  - `testRegisterUserDuplicateEmail`: 중복 이메일 예외 처리 테스트
  - `testRegisterUserInvalidInput`: 유효하지 않은 입력 처리 테스트

총 15개 테스트가 모두 성공적으로 실행되었습니다.

## 5. 테스트 실행 방법

프로젝트 루트 디렉토리에서 다음 명령어를 실행합니다:

```bash
cd back
mvn test
```

또는 특정 테스트 클래스만 실행:

```bash
mvn test -Dtest=UserControllerTest
```

## 6. 결론

사용자 등록 및 인증 기능이 정상적으로 구현되었으며, 모든 테스트가 통과하는 상태입니다. 테스트 과정에서 발생한 문제들(User 클래스 중복, Spring Security 설정, 유효성 검증 오류 처리, 메시지 언어)을 적절히 해결하여 안정적인 코드베이스를 구축했습니다.

이제 애플리케이션은 안정적으로 동작하며 추가 기능 개발을 진행할 수 있습니다. 