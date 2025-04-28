package com.giftfunding.api.exceptions;

public class InvalidInputException extends RuntimeException {
    
    public InvalidInputException(String message) {
        super(message);
    }
} 