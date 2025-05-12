package com.eshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Service
public class IpLockoutService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private AdminSecurityService adminSecurityService;

    private static final int MAX_FAILED_ATTEMPTS = 10;
    private static final int LOCK_TIME_MINUTES = 30;
    private static final String IP_LOCKOUT_PREFIX = "ip_lockout:";

    public void handleFailedAttempt(String ipAddress) {
        String key = IP_LOCKOUT_PREFIX + ipAddress;
        Long attempts = redisTemplate.opsForValue().increment(key);
        
        if (attempts == 1) {
            // Set expiration time for the first attempt
            redisTemplate.expire(key, LOCK_TIME_MINUTES, TimeUnit.MINUTES);
        }
        
        if (attempts >= MAX_FAILED_ATTEMPTS) {
            // Extend lockout period
            redisTemplate.expire(key, LOCK_TIME_MINUTES, TimeUnit.MINUTES);
        }

        // Record last attempt time
        adminSecurityService.recordIpLastAttempt(ipAddress);
    }

    public void handleSuccessfulAttempt(String ipAddress) {
        String key = IP_LOCKOUT_PREFIX + ipAddress;
        redisTemplate.delete(key);
    }

    public boolean isIpLocked(String ipAddress) {
        String key = IP_LOCKOUT_PREFIX + ipAddress;
        String attempts = redisTemplate.opsForValue().get(key);
        return attempts != null && Integer.parseInt(attempts) >= MAX_FAILED_ATTEMPTS;
    }

    public long getRemainingLockTime(String ipAddress) {
        String key = IP_LOCKOUT_PREFIX + ipAddress;
        return redisTemplate.getExpire(key, TimeUnit.MINUTES);
    }

    public String getLockoutMessage(String ipAddress) {
        long minutesRemaining = getRemainingLockTime(ipAddress);
        return String.format(
            "Too many failed attempts from this IP address. Please try again in %d minutes.",
            minutesRemaining
        );
    }
} 