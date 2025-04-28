package com.giftfunding.api.controllers;

import com.giftfunding.api.dto.ApiResponse;
import com.giftfunding.api.dto.LoginRequest;
import com.giftfunding.api.dto.LoginResponse;
import com.giftfunding.api.dto.RegisterRequest;
import com.giftfunding.api.entities.User;
import com.giftfunding.api.exceptions.InvalidCredentialsException;
import com.giftfunding.api.services.AuthService;
import com.giftfunding.api.services.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.validation.FieldError;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    private final UserService userService;
    private final AuthService authService;
    
    public AuthController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }
    
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<?>> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            User registeredUser = userService.registerUser(registerRequest);
            
            Map<String, Object> userData = new HashMap<>();
            userData.put("id", registeredUser.getId());
            userData.put("name", registeredUser.getName());
            userData.put("email", registeredUser.getEmail());
            
            return ResponseEntity.ok(ApiResponse.success("회원가입이 성공적으로 완료되었습니다.", userData));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(e.getMessage()));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest loginRequest) {
        LoginResponse loginResponse = authService.login(loginRequest);
        return ResponseEntity.ok(loginResponse);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<Map<String, String>> handleInvalidCredentialsException(InvalidCredentialsException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", ex.getMessage());
        return new ResponseEntity<>(errorResponse, org.springframework.http.HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "입력값 검증에 실패하였습니다.");
        
        // 첫 번째 에러 메시지만 반환
        if (!errors.isEmpty()) {
            String firstErrorMessage = errors.values().iterator().next();
            response.put("message", firstErrorMessage);
        }
        
        return new ResponseEntity<>(response, org.springframework.http.HttpStatus.BAD_REQUEST);
    }
} 