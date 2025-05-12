package com.eshop.repository;

import com.eshop.model.PasswordHistory;
import com.eshop.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PasswordHistoryRepository extends JpaRepository<PasswordHistory, Long> {
    
    List<PasswordHistory> findByUserOrderByCreatedAtDesc(User user);
    
    void deleteByUser(User user);
} 