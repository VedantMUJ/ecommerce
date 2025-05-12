package com.eshop.service;

import com.eshop.model.AuditLog;
import com.eshop.model.User;
import com.eshop.repository.AuditLogRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class AuditLogService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    public void logPasswordResetRequest(User user, HttpServletRequest request) {
        AuditLog log = new AuditLog();
        log.setUser(user);
        log.setAction("PASSWORD_RESET_REQUEST");
        log.setDetails("Password reset requested");
        log.setIpAddress(getClientIp(request));
        log.setUserAgent(request.getHeader("User-Agent"));
        log.setTimestamp(LocalDateTime.now());
        auditLogRepository.save(log);
    }

    public void logPasswordReset(User user, HttpServletRequest request) {
        AuditLog log = new AuditLog();
        log.setUser(user);
        log.setAction("PASSWORD_RESET");
        log.setDetails("Password successfully reset");
        log.setIpAddress(getClientIp(request));
        log.setUserAgent(request.getHeader("User-Agent"));
        log.setTimestamp(LocalDateTime.now());
        auditLogRepository.save(log);
    }

    public void logPasswordChange(User user, HttpServletRequest request) {
        AuditLog log = new AuditLog();
        log.setUser(user);
        log.setAction("PASSWORD_CHANGE");
        log.setDetails("Password changed");
        log.setIpAddress(getClientIp(request));
        log.setUserAgent(request.getHeader("User-Agent"));
        log.setTimestamp(LocalDateTime.now());
        auditLogRepository.save(log);
    }

    private String getClientIp(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        return ip;
    }
} 