package com.eshop.repository;

import com.eshop.model.SuspiciousActivity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SuspiciousActivityRepository extends JpaRepository<SuspiciousActivity, Long> {
    Optional<SuspiciousActivity> findByIpAddress(String ipAddress);
    void deleteByIpAddress(String ipAddress);
} 