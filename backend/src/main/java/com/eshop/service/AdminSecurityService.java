package com.eshop.service;

import com.eshop.dto.LockedIpDto;
import com.eshop.model.User;
import com.eshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
public class AdminSecurityService {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private IpLockoutService ipLockoutService;

    @Autowired
    private EmailService emailService;

    private static final String IP_LOCKOUT_PREFIX = "ip_lockout:";
    private static final String IP_LAST_ATTEMPT_PREFIX = "ip_last_attempt:";

    public List<LockedIpDto> getLockedIps() {
        List<LockedIpDto> lockedIps = new ArrayList<>();
        
        Set<String> keys = redisTemplate.keys(IP_LOCKOUT_PREFIX + "*");
        if (keys != null) {
            for (String key : keys) {
                String ipAddress = key.substring(IP_LOCKOUT_PREFIX.length());
                if (ipLockoutService.isIpLocked(ipAddress)) {
                    LockedIpDto dto = new LockedIpDto();
                    dto.setIpAddress(ipAddress);
                    dto.setFailedAttempts(Integer.parseInt(redisTemplate.opsForValue().get(key)));
                    dto.setMinutesRemaining(ipLockoutService.getRemainingLockTime(ipAddress));
                    
                    String lastAttemptKey = IP_LAST_ATTEMPT_PREFIX + ipAddress;
                    String lastAttemptTime = redisTemplate.opsForValue().get(lastAttemptKey);
                    dto.setLastAttemptTime(lastAttemptTime != null ? lastAttemptTime : "Unknown");
                    
                    lockedIps.add(dto);
                }
            }
        }
        
        return lockedIps;
    }

    public void unlockIp(String ipAddress) {
        String key = IP_LOCKOUT_PREFIX + ipAddress;
        redisTemplate.delete(key);
        
        String lastAttemptKey = IP_LAST_ATTEMPT_PREFIX + ipAddress;
        redisTemplate.delete(lastAttemptKey);

        // Send email notification
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof User) {
            User admin = (User) auth.getPrincipal();
            emailService.sendAdminIpUnlockEmail(admin.getEmail(), admin.getUsername(), ipAddress);
        }
    }

    public List<User> getLockedAccounts() {
        return userRepository.findByAccountLockedUntilIsNotNull();
    }

    public void unlockAccount(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setFailedLoginAttempts(0);
        user.setAccountLockedUntil(null);
        userRepository.save(user);

        // Send email notification
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof User) {
            User admin = (User) auth.getPrincipal();
            emailService.sendAdminAccountUnlockEmail(
                admin.getEmail(),
                admin.getUsername(),
                user.getUsername(),
                user.getEmail()
            );
        }
    }

    public void recordIpLastAttempt(String ipAddress) {
        String key = IP_LAST_ATTEMPT_PREFIX + ipAddress;
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
        redisTemplate.opsForValue().set(key, timestamp);
        redisTemplate.expire(key, 24, TimeUnit.HOURS);
    }
} 