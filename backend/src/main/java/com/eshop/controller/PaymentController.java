package com.eshop.controller;

import com.eshop.dto.PaymentDto;
import com.eshop.model.Payment;
import com.eshop.model.User;
import com.eshop.service.PaymentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public ResponseEntity<?> processPayment(@Valid @RequestBody PaymentDto paymentDto, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Payment payment = paymentService.processPayment(paymentDto, user);
        return ResponseEntity.ok(payment);
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<?> getPaymentByOrderId(@PathVariable Long orderId, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Payment payment = paymentService.getPaymentByOrderId(orderId, user);
        return ResponseEntity.ok(payment);
    }

    @PostMapping("/{paymentId}/refund")
    public ResponseEntity<?> refundPayment(@PathVariable Long paymentId, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Payment payment = paymentService.refundPayment(paymentId, user);
        return ResponseEntity.ok(payment);
    }
} 