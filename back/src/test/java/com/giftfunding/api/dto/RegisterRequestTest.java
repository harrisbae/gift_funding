package com.giftfunding.api.dto;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

class RegisterRequestTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("유효한 회원가입 요청 검증 성공")
    void testValidRegisterRequest() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setName("테스트 사용자");
        request.setEmail("test@example.com");
        request.setPassword("password123");

        // When
        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        // Then
        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("이름이 비어있는 경우 검증 실패")
    void testEmptyNameValidation() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setName("");
        request.setEmail("test@example.com");
        request.setPassword("password123");

        // When
        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        // Then
        assertFalse(violations.isEmpty());
        assertEquals(1, violations.size());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("name")));
    }

    @Test
    @DisplayName("이메일 형식이 잘못된 경우 검증 실패")
    void testInvalidEmailFormatValidation() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setName("테스트 사용자");
        request.setEmail("invalid-email");
        request.setPassword("password123");

        // When
        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        // Then
        assertFalse(violations.isEmpty());
        assertEquals(1, violations.size());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("email")));
    }

    @Test
    @DisplayName("비밀번호가 너무 짧은 경우 검증 실패")
    void testShortPasswordValidation() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setName("테스트 사용자");
        request.setEmail("test@example.com");
        request.setPassword("short");

        // When
        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        // Then
        assertFalse(violations.isEmpty());
        assertEquals(1, violations.size());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("password")));
    }

    @Test
    @DisplayName("여러 필드가 유효하지 않은 경우 검증 실패")
    void testMultipleInvalidFieldsValidation() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setName("");
        request.setEmail("invalid-email");
        request.setPassword("short");

        // When
        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(request);

        // Then
        assertFalse(violations.isEmpty());
        assertEquals(3, violations.size());
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("name")));
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("email")));
        assertTrue(violations.stream()
                .anyMatch(v -> v.getPropertyPath().toString().equals("password")));
    }
} 