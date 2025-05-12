package com.eshop.converter;

import com.eshop.model.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Component
public class CartToOrderConverter {

    public Order convertCartToOrder(Cart cart) {
        Order order = new Order();
        order.setUser(cart.getUser());
        order.setStatus("PENDING");
        order.setTotalPrice(cart.getTotalPrice());
        
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
        order.setCreatedAt(timestamp);
        order.setUpdatedAt(timestamp);

        // Convert cart items to order items
        for (CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(cartItem.getUnitPrice());
            orderItem.setTotalPrice(cartItem.getTotalPrice());
            orderItem.setCreatedAt(timestamp);
            orderItem.setUpdatedAt(timestamp);
            order.getOrderItems().add(orderItem);
        }

        // Create payment record
        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setAmount(cart.getTotalPrice());
        payment.setStatus("PENDING");
        payment.setCreatedAt(timestamp);
        payment.setUpdatedAt(timestamp);
        order.setPayment(payment);

        return order;
    }
} 