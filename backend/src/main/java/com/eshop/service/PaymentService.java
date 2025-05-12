package com.eshop.service;

import com.eshop.dto.PaymentDto;
import com.eshop.model.Order;
import com.eshop.model.Payment;
import com.eshop.model.User;
import com.eshop.repository.OrderRepository;
import com.eshop.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public Payment processPayment(PaymentDto paymentDto, User user) {
        Order order = orderRepository.findById(paymentDto.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Order does not belong to user");
        }

        if (!order.getStatus().equals("PENDING")) {
            throw new RuntimeException("Order is not in a valid state for payment");
        }

        // Validate payment amount
        if (paymentDto.getAmount().compareTo(order.getTotalAmount()) != 0) {
            throw new RuntimeException("Payment amount does not match order total");
        }

        // Create payment record
        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(paymentDto.getAmount());
        payment.setPaymentMethod(paymentDto.getPaymentMethod());
        payment.setStatus("PENDING");
        payment.setTransactionId(paymentDto.getTransactionId());
        payment.setCreatedAt(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        payment.setUpdatedAt(payment.getCreatedAt());

        // Process payment (simplified - in real app, integrate with payment gateway)
        try {
            // Simulate payment processing
            Thread.sleep(1000);
            
            // Update payment status
            payment.setStatus("COMPLETED");
            payment.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
            
            // Update order status
            order.setStatus("PAID");
            order.setUpdatedAt(payment.getUpdatedAt());
            orderRepository.save(order);
            
        } catch (Exception e) {
            payment.setStatus("FAILED");
            payment.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
            throw new RuntimeException("Payment processing failed: " + e.getMessage());
        }

        return paymentRepository.save(payment);
    }

    @Transactional
    public Payment getPaymentByOrderId(Long orderId, User user) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!order.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Order does not belong to user");
        }

        return paymentRepository.findByOrder(order)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    @Transactional
    public Payment refundPayment(Long paymentId, User user) {
        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        if (!payment.getOrder().getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Payment does not belong to user");
        }

        if (!payment.getStatus().equals("COMPLETED")) {
            throw new RuntimeException("Only completed payments can be refunded");
        }

        // Process refund (simplified - in real app, integrate with payment gateway)
        try {
            // Simulate refund processing
            Thread.sleep(1000);
            
            // Update payment status
            payment.setStatus("REFUNDED");
            payment.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
            
            // Update order status
            Order order = payment.getOrder();
            order.setStatus("REFUNDED");
            order.setUpdatedAt(payment.getUpdatedAt());
            orderRepository.save(order);
            
        } catch (Exception e) {
            throw new RuntimeException("Refund processing failed: " + e.getMessage());
        }

        return paymentRepository.save(payment);
    }
} 