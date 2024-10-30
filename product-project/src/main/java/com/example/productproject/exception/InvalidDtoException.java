package com.example.productproject.exception;

import lombok.Getter;

import java.util.List;
@Getter
public class InvalidDtoException extends Exception {
    private final List<String> errorMessages;
    public InvalidDtoException(List<String> errorMessages){
        this.errorMessages = errorMessages;
    }
}
