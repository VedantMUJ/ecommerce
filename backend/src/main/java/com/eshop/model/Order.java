package com.eshop.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> orderItems = new ArrayList<>();

    @Column(nullable = false)
    private String status;

    @Column(nullable = false)
    private Double totalAmount;

    @Column(nullable = false)
    private LocalDateTime orderDate;

    @Column
    private LocalDateTime deliveryDate;

    @Column
    private String shippingAddress;

    @Column
    private String paymentMethod;

    @Column
    private String paymentStatus;

    @PrePersist
    protected void onCreate() {
        orderDate = LocalDateTime.now();
    }
} 