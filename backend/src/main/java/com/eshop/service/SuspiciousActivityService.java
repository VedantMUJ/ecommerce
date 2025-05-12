package com.eshop.service;

import com.eshop.dto.SuspiciousActivityDto;
import com.eshop.model.SuspiciousActivity;
import com.eshop.repository.SuspiciousActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SuspiciousActivityService {

    @Autowired
    private SuspiciousActivityRepository suspiciousActivityRepository;

    public List<SuspiciousActivityDto> getSuspiciousActivities(
            String activityType,
            String status,
            String sortBy,
            boolean ascending
    ) {
        List<SuspiciousActivity> activities = suspiciousActivityRepository.findAll();
        
        return activities.stream()
            .filter(activity -> activityType == null || activity.getActivityType().equals(activityType))
            .filter(activity -> status == null || activity.getStatus().equals(status))
            .sorted((a1, a2) -> {
                int comparison = 0;
                switch (sortBy) {
                    case "timestamp":
                        comparison = a1.getTimestamp().compareTo(a2.getTimestamp());
                        break;
                    case "attemptCount":
                        comparison = Integer.compare(a1.getAttemptCount(), a2.getAttemptCount());
                        break;
                    case "status":
                        comparison = a1.getStatus().compareTo(a2.getStatus());
                        break;
                    default:
                        comparison = a1.getTimestamp().compareTo(a2.getTimestamp());
                }
                return ascending ? comparison : -comparison;
            })
            .map(this::convertToDto)
            .collect(Collectors.toList());
    }

    public void clearActivity(String ipAddress) {
        suspiciousActivityRepository.deleteByIpAddress(ipAddress);
    }

    public void recordActivity(String ipAddress, String username, String activityType) {
        SuspiciousActivity activity = suspiciousActivityRepository.findByIpAddress(ipAddress)
            .orElseGet(() -> {
                SuspiciousActivity newActivity = new SuspiciousActivity();
                newActivity.setIpAddress(ipAddress);
                newActivity.setUsername(username);
                newActivity.setActivityType(activityType);
                newActivity.setAttemptCount(0);
                newActivity.setStatus("LOW");
                return newActivity;
            });

        activity.setAttemptCount(activity.getAttemptCount() + 1);
        activity.setTimestamp(LocalDateTime.now());
        
        // Update status based on attempt count
        if (activity.getAttemptCount() >= 10) {
            activity.setStatus("HIGH");
        } else if (activity.getAttemptCount() >= 5) {
            activity.setStatus("MEDIUM");
        }

        suspiciousActivityRepository.save(activity);
    }

    private SuspiciousActivityDto convertToDto(SuspiciousActivity activity) {
        SuspiciousActivityDto dto = new SuspiciousActivityDto();
        dto.setIpAddress(activity.getIpAddress());
        dto.setUsername(activity.getUsername());
        dto.setActivityType(activity.getActivityType());
        dto.setTimestamp(activity.getTimestamp());
        dto.setAttemptCount(activity.getAttemptCount());
        dto.setStatus(activity.getStatus());
        return dto;
    }
} 