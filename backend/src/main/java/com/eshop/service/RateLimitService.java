package com.eshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Service
public class RateLimitService {

    @Autowired
    private RedisTemplate<String, Integer> redisTemplate;

    private static final String PREFIX = "rate_limit:";
    private static final int MAX_ATTEMPTS = 3;
    private static final Duration WINDOW = Duration.ofHours(1);

    public boolean isRateLimited(String key) {
        String redisKey = PREFIX + key;
        Integer attempts = redisTemplate.opsForValue().get(redisKey);
        
        if (attempts == null) {
            redisTemplate.opsForValue().set(redisKey, 1, WINDOW.toMinutes(), TimeUnit.MINUTES);
            return false;
        }
        
        if (attempts >= MAX_ATTEMPTS) {
            return true;
        }
        
        redisTemplate.opsForValue().increment(redisKey);
        return false;
    }

    public void resetRateLimit(String key) {
        String redisKey = PREFIX + key;
        redisTemplate.delete(redisKey);
    }
} 