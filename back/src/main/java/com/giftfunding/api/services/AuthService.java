package com.giftfunding.api.services;

import com.giftfunding.api.dto.LoginRequest;
import com.giftfunding.api.dto.LoginResponse;
import com.giftfunding.api.entities.User;
import com.giftfunding.api.exceptions.InvalidCredentialsException;
import com.giftfunding.api.repositories.UserRepository;
import com.giftfunding.api.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest loginRequest) {
        // 이메일로 사용자 조회
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new InvalidCredentialsException("이메일 또는 비밀번호가 올바르지 않습니다."));
        
        // 비밀번호 검증
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }
        
        // JWT 토큰 생성
        String token = jwtUtil.generateToken(user.getEmail());
        
        // 로그인 응답 생성
        return new LoginResponse(user.getId(), user.getName(), user.getEmail(), token);
    }
} 