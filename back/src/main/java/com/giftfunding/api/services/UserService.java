package com.giftfunding.api.services;

import com.giftfunding.api.dto.RegisterRequest;
import com.giftfunding.api.entities.User;
import com.giftfunding.api.exceptions.DuplicateEmailException;
import com.giftfunding.api.exceptions.InvalidInputException;
import com.giftfunding.api.repositories.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolation;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import java.util.Set;

@Service
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    public User registerUser(RegisterRequest registerRequest) {
        // 입력값 유효성 검사
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        Validator validator = factory.getValidator();
        Set<ConstraintViolation<RegisterRequest>> violations = validator.validate(registerRequest);
        
        if (!violations.isEmpty()) {
            throw new InvalidInputException(violations.iterator().next().getMessage());
        }
        
        // 이메일 중복 확인
        if (userRepository.findByEmail(registerRequest.getEmail()).isPresent()) {
            throw new DuplicateEmailException("Email already exists");
        }
        
        // 비밀번호 암호화
        User user = new User();
        user.setName(registerRequest.getName());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        
        // 사용자 저장
        return userRepository.save(user);
    }
} 