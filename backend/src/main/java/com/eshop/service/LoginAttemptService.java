package com.eshop.service;

import com.eshop.model.User;
import com.eshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
public class LoginAttemptService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private SuspiciousActivityService suspiciousActivityService;

    private static final int MAX_FAILED_ATTEMPTS = 5;
    private static final int LOCK_TIME_MINUTES = 30;

    @Transactional
    public void handleFailedLogin(User user, String ipAddress) {
        user.setFailedLoginAttempts(user.getFailedLoginAttempts() + 1);
        
        if (user.getFailedLoginAttempts() >= MAX_FAILED_ATTEMPTS) {
            LocalDateTime lockUntil = LocalDateTime.now().plus(LOCK_TIME_MINUTES, ChronoUnit.MINUTES);
            user.setAccountLockedUntil(lockUntil);
            
            // Send lockout notification email
            emailService.sendAccountLockoutEmail(
                user.getEmail(),
                user.getUsername(),
                LOCK_TIME_MINUTES
            );
        }
        
        // Record suspicious activity
        suspiciousActivityService.recordActivity(
            ipAddress,
            user.getUsername(),
            "FAILED_LOGIN"
        );
        
        userRepository.save(user);
    }

    @Transactional
    public void handleSuccessfulLogin(User user, String ipAddress) {
        user.setFailedLoginAttempts(0);
        user.setAccountLockedUntil(null);
        userRepository.save(user);
    }

    public boolean isAccountLocked(User user) {
        if (user.getAccountLockedUntil() == null) {
            return false;
        }
        return LocalDateTime.now().isBefore(user.getAccountLockedUntil());
    }

    public String getLockoutMessage(User user) {
        if (user.getAccountLockedUntil() == null) {
            return null;
        }
        
        long minutesRemaining = ChronoUnit.MINUTES.between(
            LocalDateTime.now(),
            user.getAccountLockedUntil()
        );
        
        return String.format(
            "Account is locked. Please try again in %d minutes.",
            minutesRemaining
        );
    }
} 