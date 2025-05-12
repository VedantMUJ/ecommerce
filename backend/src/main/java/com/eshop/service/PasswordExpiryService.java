package com.eshop.service;

import com.eshop.model.User;
import com.eshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PasswordExpiryService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    private static final int PASSWORD_EXPIRY_DAYS = 90;
    private static final int EXPIRY_WARNING_DAYS = 7;

    public void checkPasswordExpiry(User user) {
        if (user.getPasswordExpiryDate() == null) {
            return;
        }

        LocalDateTime now = LocalDateTime.now();
        if (now.isAfter(user.getPasswordExpiryDate())) {
            throw new RuntimeException("Your password has expired. Please reset your password.");
        }

        if (now.plusDays(EXPIRY_WARNING_DAYS).isAfter(user.getPasswordExpiryDate())) {
            try {
                emailService.sendPasswordExpiryWarningEmail(user.getEmail());
            } catch (Exception e) {
                System.err.println("Failed to send password expiry warning email: " + e.getMessage());
            }
        }
    }

    public void updatePasswordExpiry(User user) {
        user.setLastPasswordChange(LocalDateTime.now());
        user.setPasswordExpiryDate(LocalDateTime.now().plusDays(PASSWORD_EXPIRY_DAYS));
        userRepository.save(user);
    }

    public List<User> getUsersWithExpiringPasswords() {
        LocalDateTime warningDate = LocalDateTime.now().plusDays(EXPIRY_WARNING_DAYS);
        return userRepository.findByPasswordExpiryDateBefore(warningDate);
    }
} 