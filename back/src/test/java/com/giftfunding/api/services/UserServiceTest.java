package com.giftfunding.api.services;

import com.giftfunding.api.dto.RegisterRequest;
import com.giftfunding.api.entities.User;
import com.giftfunding.api.exceptions.DuplicateEmailException;
import com.giftfunding.api.exceptions.InvalidInputException;
import com.giftfunding.api.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("정상적인 회원가입 요청 처리")
    void testRegisterUserSuccessful() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setName("테스트 사용자");
        request.setEmail("test@example.com");
        request.setPassword("password123");

        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.empty());
        when(passwordEncoder.encode(request.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(new User());

        // When
        userService.registerUser(request);

        // Then
        verify(userRepository, times(1)).findByEmail(request.getEmail());
        verify(passwordEncoder, times(1)).encode(request.getPassword());
        verify(userRepository, times(1)).save(any(User.class));
    }

    @Test
    @DisplayName("중복된 이메일로 회원가입 시 예외 발생")
    void testRegisterUserWithDuplicateEmail() {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setName("테스트 사용자");
        request.setEmail("existing@example.com");
        request.setPassword("password123");

        User existingUser = new User();
        existingUser.setEmail(request.getEmail());
        when(userRepository.findByEmail(request.getEmail())).thenReturn(Optional.of(existingUser));

        // When & Then
        DuplicateEmailException exception = assertThrows(DuplicateEmailException.class, () -> 
            userService.registerUser(request)
        );
        assertEquals("Email already exists", exception.getMessage());
        
        verify(userRepository, times(1)).findByEmail(request.getEmail());
        verify(userRepository, never()).save(any(User.class));
    }

    @Test
    @DisplayName("유효하지 않은 입력으로 회원가입 시 예외 발생")
    void testRegisterUserWithInvalidInput() {
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
        
        // 서비스 메소드 호출 시 예외가 발생하는지 확인
        assertThrows(InvalidInputException.class, () -> {
            // Mockito 설정이 필요하지 않음 - 유효성 검사에서 이미 예외가 발생할 것이기 때문
            userService.registerUser(request);
        });
    }
} 