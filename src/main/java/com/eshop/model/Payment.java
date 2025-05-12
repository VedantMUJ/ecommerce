package com.eshop.model;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;

@Entity
@Table(name = "payments")
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    @Column(name = "payment_method", nullable = false)
    private String paymentMethod; // CREDIT_CARD, DEBIT_CARD, PAYPAL, etc.

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;

    @Column(name = "transaction_id")
    private String transactionId;

    @Column(name = "payment_status", nullable = false)
    private String paymentStatus; // PENDING, COMPLETED, FAILED, REFUNDED

    @Column(name = "payment_date")
    private String paymentDate;

    @Column(name = "card_last_four")
    private String cardLastFour;

    @Column(name = "card_type")
    private String cardType;

    @Column(name = "created_at")
    private String createdAt;

    @Column(name = "updated_at")
    private String updatedAt;
} 