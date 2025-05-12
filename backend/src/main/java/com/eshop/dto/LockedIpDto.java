package com.eshop.dto;

import lombok.Data;

@Data
public class LockedIpDto {
    private String ipAddress;
    private int failedAttempts;
    private long minutesRemaining;
    private String lastAttemptTime;
} 