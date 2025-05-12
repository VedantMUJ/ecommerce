package com.eshop.controller;

import com.eshop.dto.SuspiciousActivityDto;
import com.eshop.service.SuspiciousActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/suspicious-activities")
@PreAuthorize("hasRole('ADMIN')")
public class SuspiciousActivityController {

    @Autowired
    private SuspiciousActivityService suspiciousActivityService;

    @GetMapping
    public ResponseEntity<List<SuspiciousActivityDto>> getSuspiciousActivities(
            @RequestParam(required = false) String activityType,
            @RequestParam(required = false) String status,
            @RequestParam(defaultValue = "timestamp") String sortBy,
            @RequestParam(defaultValue = "false") boolean ascending
    ) {
        List<SuspiciousActivityDto> activities = suspiciousActivityService.getSuspiciousActivities(
            activityType, status, sortBy, ascending
        );
        return ResponseEntity.ok(activities);
    }

    @DeleteMapping("/{ipAddress}")
    public ResponseEntity<Void> clearActivity(@PathVariable String ipAddress) {
        suspiciousActivityService.clearActivity(ipAddress);
        return ResponseEntity.ok().build();
    }
} 