package com.giftfunding.api.services;

import com.giftfunding.api.dto.LoginRequest;
import com.giftfunding.api.dto.LoginResponse;
import com.giftfunding.api.entities.User;
import com.giftfunding.api.exceptions.InvalidCredentialsException;
import com.giftfunding.api.repositories.UserRepository;
import com.giftfunding.api.utils.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class AuthServiceTest {

    @Mock
    private UserRepository userRepository;
    
    @Mock
    private PasswordEncoder passwordEncoder;
    
    @Mock
    private JwtUtil jwtUtil;
    
    @InjectMocks
    private AuthService authService;
    
    private User testUser;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        // 테스트용 사용자 생성
        testUser = new User();
        testUser.setId(1L);
        testUser.setName("테스트 사용자");
        testUser.setEmail("test@example.com");
        testUser.setPassword("encodedPassword123");
        
        // JwtUtil 모킹 설정
        when(jwtUtil.generateToken(anyString())).thenReturn("mock-token-12345");
    }
    
    @Test
    @DisplayName("로그인 성공 테스트")
    void testLoginSuccess() {
        // Given
        LoginRequest loginRequest = new LoginRequest("test@example.com", "password123", false);
        
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("password123", "encodedPassword123")).thenReturn(true);
        
        // When
        LoginResponse response = authService.login(loginRequest);
        
        // Then
        assertNotNull(response);
        assertEquals(testUser.getId(), response.getId());
        assertEquals(testUser.getName(), response.getName());
        assertEquals(testUser.getEmail(), response.getEmail());
        assertEquals("mock-token-12345", response.getToken());
        
        verify(userRepository, times(1)).findByEmail("test@example.com");
        verify(passwordEncoder, times(1)).matches("password123", "encodedPassword123");
        verify(jwtUtil, times(1)).generateToken(testUser.getEmail());
    }
    
    @Test
    @DisplayName("로그인 실패 - 존재하지 않는 이메일")
    void testLoginFailUserNotFound() {
        // Given
        LoginRequest loginRequest = new LoginRequest("nonexistent@example.com", "password123", false);
        
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());
        
        // When & Then
        InvalidCredentialsException exception = assertThrows(InvalidCredentialsException.class, () -> {
            authService.login(loginRequest);
        });
        
        assertEquals("이메일 또는 비밀번호가 올바르지 않습니다.", exception.getMessage());
        verify(userRepository, times(1)).findByEmail("nonexistent@example.com");
        verify(passwordEncoder, never()).matches(anyString(), anyString());
    }
    
    @Test
    @DisplayName("로그인 실패 - 잘못된 비밀번호")
    void testLoginFailInvalidPassword() {
        // Given
        LoginRequest loginRequest = new LoginRequest("test@example.com", "wrongPassword", false);
        
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("wrongPassword", "encodedPassword123")).thenReturn(false);
        
        // When & Then
        InvalidCredentialsException exception = assertThrows(InvalidCredentialsException.class, () -> {
            authService.login(loginRequest);
        });
        
        assertEquals("이메일 또는 비밀번호가 올바르지 않습니다.", exception.getMessage());
        verify(userRepository, times(1)).findByEmail("test@example.com");
        verify(passwordEncoder, times(1)).matches("wrongPassword", "encodedPassword123");
    }
} 