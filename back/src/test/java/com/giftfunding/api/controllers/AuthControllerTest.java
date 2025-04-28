package com.giftfunding.api.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.giftfunding.api.dto.LoginRequest;
import com.giftfunding.api.dto.LoginResponse;
import com.giftfunding.api.exceptions.InvalidCredentialsException;
import com.giftfunding.api.services.AuthService;
import com.giftfunding.api.services.UserService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = {AuthController.class})
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AuthService authService;
    
    @MockBean
    private UserService userService;

    @Test
    public void testLoginSuccess() throws Exception {
        // 테스트 데이터 준비
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("test@example.com");
        loginRequest.setPassword("password123");
        loginRequest.setRememberMe(false);

        LoginResponse loginResponse = new LoginResponse();
        loginResponse.setId(1L);
        loginResponse.setName("테스트 사용자");
        loginResponse.setEmail("test@example.com");
        loginResponse.setToken("test-token-12345");

        // authService의 login 메서드가 호출될 때 loginResponse를 반환하도록 설정
        when(authService.login(any(LoginRequest.class))).thenReturn(loginResponse);

        // 테스트 실행
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("테스트 사용자"))
                .andExpect(jsonPath("$.email").value("test@example.com"))
                .andExpect(jsonPath("$.token").value("test-token-12345"));
    }

    @Test
    public void testLoginFailInvalidCredentials() throws Exception {
        // 테스트 데이터 준비
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setEmail("wrong@example.com");
        loginRequest.setPassword("wrongpassword");
        loginRequest.setRememberMe(false);

        // authService의 login 메서드가 호출될 때 예외를 던지도록 설정
        when(authService.login(any(LoginRequest.class)))
                .thenThrow(new InvalidCredentialsException("이메일 또는 비밀번호가 올바르지 않습니다."));

        // 테스트 실행
        mockMvc.perform(post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(loginRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.message").value("이메일 또는 비밀번호가 올바르지 않습니다."));
    }

    // 서버 에러 테스트는 일단 스킵
    // @Test
    // public void testLoginFailServerError() throws Exception {
    //     // 테스트 데이터 준비
    //     LoginRequest loginRequest = new LoginRequest();
    //     loginRequest.setEmail("test@example.com");
    //     loginRequest.setPassword("password123");
    //     loginRequest.setRememberMe(false);

    //     // authService의 login 메서드가 호출될 때 예외를 던지도록 설정
    //     when(authService.login(any(LoginRequest.class)))
    //             .thenThrow(new RuntimeException("서버 내부 오류가 발생했습니다."));

    //     // 테스트 실행
    //     mockMvc.perform(post("/api/auth/login")
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .content(objectMapper.writeValueAsString(loginRequest)))
    //             .andExpect(status().isInternalServerError())
    //             .andExpect(jsonPath("$.message").value("로그인 처리 중 오류가 발생했습니다."));
    // }
} 