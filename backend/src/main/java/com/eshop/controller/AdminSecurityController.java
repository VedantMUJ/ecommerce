package com.eshop.controller;

import com.eshop.dto.LockedIpDto;
import com.eshop.model.User;
import com.eshop.service.AdminSecurityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/security")
@PreAuthorize("hasRole('ADMIN')")
public class AdminSecurityController {

    @Autowired
    private AdminSecurityService adminSecurityService;

    @GetMapping("/locked-ips")
    public ResponseEntity<List<LockedIpDto>> getLockedIps() {
        return ResponseEntity.ok(adminSecurityService.getLockedIps());
    }

    @DeleteMapping("/locked-ips/{ipAddress}")
    public ResponseEntity<Void> unlockIp(@PathVariable String ipAddress) {
        adminSecurityService.unlockIp(ipAddress);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/locked-accounts")
    public ResponseEntity<List<User>> getLockedAccounts() {
        return ResponseEntity.ok(adminSecurityService.getLockedAccounts());
    }

    @DeleteMapping("/locked-accounts/{userId}")
    public ResponseEntity<Void> unlockAccount(@PathVariable Long userId) {
        adminSecurityService.unlockAccount(userId);
        return ResponseEntity.ok().build();
    }
} 