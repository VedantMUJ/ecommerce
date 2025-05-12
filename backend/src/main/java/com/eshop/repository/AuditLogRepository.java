package com.eshop.repository;

import com.eshop.model.AuditLog;
import com.eshop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AuditLogRepository extends JpaRepository<AuditLog, Long> {
    
    List<AuditLog> findByUserOrderByTimestampDesc(User user);
    
    List<AuditLog> findByUserAndTimestampBetweenOrderByTimestampDesc(
        User user, LocalDateTime start, LocalDateTime end);
    
    void deleteByUser(User user);
} 