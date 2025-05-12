package com.eshop.service;

import com.eshop.dto.PasswordResetDto;
import com.eshop.dto.PasswordResetRequestDto;
import com.eshop.model.PasswordHistory;
import com.eshop.model.PasswordResetToken;
import com.eshop.model.User;
import com.eshop.repository.PasswordHistoryRepository;
import com.eshop.repository.PasswordResetTokenRepository;
import com.eshop.repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Autowired
    private RateLimitService rateLimitService;

    @Autowired
    private PasswordValidationService passwordValidationService;

    @Autowired
    private PasswordHistoryRepository passwordHistoryRepository;

    @Autowired
    private AuditLogService auditLogService;

    @Autowired
    private SuspiciousActivityService suspiciousActivityService;

    @Autowired
    private HttpServletRequest request;

    private static final int PASSWORD_HISTORY_SIZE = 5;

    @Transactional
    public void requestPasswordReset(PasswordResetRequestDto requestDto) {
        // Check rate limit
        if (rateLimitService.isRateLimited(requestDto.getEmail())) {
            throw new RuntimeException("Too many password reset attempts. Please try again later.");
        }

        User user = userRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Delete any existing tokens for this user
        tokenRepository.deleteByUser(user);

        // Create new token
        String token = UUID.randomUUID().toString();
        user.setResetToken(token);
        user.setResetTokenExpiry(LocalDateTime.now().plusHours(24));
        userRepository.save(user);

        // Record password reset request
        String ipAddress = getClientIp();
        suspiciousActivityService.recordPasswordResetRequest(ipAddress, user.getUsername());

        // Log the reset request
        auditLogService.logPasswordResetRequest(user, request);

        // Send email
        try {
            emailService.sendPasswordResetEmail(user.getEmail(), token);
        } catch (Exception e) {
            throw new RuntimeException("Failed to send reset email", e);
        }
    }

    @Transactional
    public void resetPassword(PasswordResetDto resetDto) {
        if (!resetDto.getNewPassword().equals(resetDto.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }

        // Validate password strength
        passwordValidationService.validatePassword(resetDto.getNewPassword());

        User user = userRepository.findByResetToken(resetDto.getToken())
                .orElseThrow(() -> new RuntimeException("Invalid reset token"));

        if (user.getResetTokenExpiry().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Reset token has expired");
        }

        String newPasswordHash = passwordEncoder.encode(resetDto.getNewPassword());

        // Check password history
        List<PasswordHistory> recentPasswords = passwordHistoryRepository.findByUserOrderByCreatedAtDesc(user);
        for (PasswordHistory history : recentPasswords) {
            if (passwordEncoder.matches(resetDto.getNewPassword(), history.getPasswordHash())) {
                throw new RuntimeException("You cannot reuse a recently used password");
            }
        }

        // Save current password to history
        PasswordHistory passwordHistory = new PasswordHistory();
        passwordHistory.setUser(user);
        passwordHistory.setPasswordHash(user.getPassword());
        passwordHistory.setCreatedAt(LocalDateTime.now());
        passwordHistoryRepository.save(passwordHistory);

        // Update user's password
        user.setPassword(newPasswordHash);
        user.setResetToken(null);
        user.setResetTokenExpiry(null);
        user.setLastPasswordChange(LocalDateTime.now());
        userRepository.save(user);

        // Clean up old password history
        if (recentPasswords.size() >= PASSWORD_HISTORY_SIZE) {
            passwordHistoryRepository.delete(recentPasswords.get(PASSWORD_HISTORY_SIZE - 1));
        }

        // Log the password reset
        auditLogService.logPasswordReset(user, request);

        // Send confirmation email
        try {
            emailService.sendPasswordChangedEmail(user.getEmail());
        } catch (Exception e) {
            // Log the error but don't fail the operation
            System.err.println("Failed to send password changed email: " + e.getMessage());
        }

        // Delete the used token and reset rate limit
        tokenRepository.deleteByUser(user);
        rateLimitService.resetRateLimit(user.getEmail());
    }

    private String getClientIp() {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
} 