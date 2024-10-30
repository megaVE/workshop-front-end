package com.example.productproject.web.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
@NoArgsConstructor @AllArgsConstructor
@Getter @Setter
public class ErrorDTO {
    private String endpoint;
    private String message;
    private LocalDateTime timestamp;
}
