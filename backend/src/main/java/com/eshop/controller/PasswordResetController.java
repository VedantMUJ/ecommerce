package com.eshop.controller;

import com.eshop.dto.PasswordResetDto;
import com.eshop.dto.PasswordResetRequestDto;
import com.eshop.service.PasswordResetService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class PasswordResetController {

    @Autowired
    private PasswordResetService passwordResetService;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> requestPasswordReset(@Valid @RequestBody PasswordResetRequestDto requestDto) {
        passwordResetService.requestPasswordReset(requestDto);
        return ResponseEntity.ok().body("Password reset link has been sent to your email");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Valid @RequestBody PasswordResetDto resetDto) {
        if (!resetDto.getNewPassword().equals(resetDto.getConfirmPassword())) {
            return ResponseEntity.badRequest().body("Passwords do not match");
        }
        
        passwordResetService.resetPassword(resetDto);
        return ResponseEntity.ok().body("Password has been reset successfully");
    }
} 