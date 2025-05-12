package com.eshop.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class SuspiciousActivityDto {
    private String ipAddress;
    private String username;
    private String activityType;
    private LocalDateTime timestamp;
    private Integer attemptCount;
    private String status;
} 