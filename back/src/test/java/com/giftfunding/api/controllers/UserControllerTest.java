package com.giftfunding.api.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.giftfunding.api.dto.RegisterRequest;
import com.giftfunding.api.exceptions.DuplicateEmailException;
import com.giftfunding.api.exceptions.InvalidInputException;
import com.giftfunding.api.services.UserService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@WithMockUser
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private UserService userService;

    @Test
    @DisplayName("회원가입 성공")
    void testRegisterUserSuccess() throws Exception {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setName("테스트 사용자");
        request.setEmail("test@example.com");
        request.setPassword("password123");

        // When & Then
        mockMvc.perform(post("/api/v1/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success", is(true)))
                .andExpect(jsonPath("$.message", is("User registered successfully")));
    }

    @Test
    @DisplayName("회원가입 실패 - 중복된 이메일")
    void testRegisterUserFailDuplicateEmail() throws Exception {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setName("테스트 사용자");
        request.setEmail("existing@example.com");
        request.setPassword("password123");

        // Mock the service to throw an exception for duplicate email
        doThrow(new DuplicateEmailException("Email already exists")).when(userService).registerUser(any(RegisterRequest.class));

        // When & Then
        mockMvc.perform(post("/api/v1/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("Email already exists")));
    }

    @Test
    @DisplayName("회원가입 실패 - 유효하지 않은 입력")
    void testRegisterUserFailInvalidInput() throws Exception {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setName("");
        request.setEmail("test@example.com");
        request.setPassword("password123");

        // When & Then
        mockMvc.perform(post("/api/v1/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message", is("이름은 필수 입력값입니다.")));
    }

    @Test
    @DisplayName("회원가입 실패 - 유효성 검사 실패")
    void testRegisterUserFailValidation() throws Exception {
        // Given
        RegisterRequest request = new RegisterRequest();
        request.setName("");
        request.setEmail("invalid-email");
        request.setPassword("short");

        // When & Then
        mockMvc.perform(post("/api/v1/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request))
                .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success", is(false)))
                .andExpect(jsonPath("$.message").exists()); // 메시지에 유효성 검사 오류가 포함되어 있는지 확인
    }
} 