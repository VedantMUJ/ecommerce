package com.eshop.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.util.List;

@Data
public class OrderDto {
    @NotEmpty(message = "Order items are required")
    private List<@Valid OrderItemDto> orderItems;

    @NotNull(message = "Shipping address is required")
    private String shippingAddress;

    @NotNull(message = "Billing address is required")
    private String billingAddress;

    @NotNull(message = "Payment method is required")
    private String paymentMethod;
} 