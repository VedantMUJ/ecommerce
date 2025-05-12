package com.eshop.service;

import com.eshop.dto.OrderDto;
import com.eshop.dto.OrderItemDto;
import com.eshop.model.*;
import com.eshop.repository.OrderItemRepository;
import com.eshop.repository.OrderRepository;
import com.eshop.repository.ProductRepository;
import com.eshop.repository.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public OrderService(OrderRepository orderRepository,
                       OrderItemRepository orderItemRepository,
                       ProductRepository productRepository,
                       UserRepository userRepository) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public Order createOrder(OrderDto orderDto) {
        // Get current user
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Create order
        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(orderDto.getShippingAddress());
        order.setBillingAddress(orderDto.getBillingAddress());
        order.setOrderStatus("PENDING");
        order.setPaymentStatus("PENDING");

        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
        order.setCreatedAt(timestamp);
        order.setUpdatedAt(timestamp);

        // Calculate total price and create order items
        BigDecimal totalPrice = BigDecimal.ZERO;
        List<OrderItem> orderItems = new ArrayList<>();

        for (OrderItemDto itemDto : orderDto.getOrderItems()) {
            Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found: " + itemDto.getProductId()));

            // Check stock
            if (product.getStockQuantity() < itemDto.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product: " + product.getName());
            }

            // Create order item
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(itemDto.getQuantity());
            orderItem.setUnitPrice(product.getPrice());
            orderItem.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(itemDto.getQuantity())));
            orderItem.setCreatedAt(timestamp);
            orderItem.setUpdatedAt(timestamp);

            orderItems.add(orderItem);
            totalPrice = totalPrice.add(orderItem.getTotalPrice());

            // Update product stock
            product.setStockQuantity(product.getStockQuantity() - itemDto.getQuantity());
            product.setUpdatedAt(timestamp);
            productRepository.save(product);
        }

        order.setTotalPrice(totalPrice);
        order.setOrderItems(new HashSet<>(orderItems));

        // Create payment
        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setPaymentMethod(orderDto.getPaymentMethod());
        payment.setAmount(totalPrice);
        payment.setPaymentStatus("PENDING");
        payment.setCreatedAt(timestamp);
        payment.setUpdatedAt(timestamp);

        order.setPayments(new HashSet<>(List.of(payment)));

        return orderRepository.save(order);
    }

    public List<Order> getOrdersByUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return orderRepository.findByUser(user);
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    @Transactional
    public Order updateOrderStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        order.setOrderStatus(status);
        order.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        return orderRepository.save(order);
    }

    @Transactional
    public Order updatePaymentStatus(Long id, String status) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Payment payment = order.getPayments().iterator().next();
        payment.setPaymentStatus(status);
        payment.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));

        order.setPaymentStatus(status);
        order.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));

        return orderRepository.save(order);
    }

    @Transactional
    public void cancelOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (!"PENDING".equals(order.getOrderStatus())) {
            throw new RuntimeException("Cannot cancel order with status: " + order.getOrderStatus());
        }

        // Restore product stock
        for (OrderItem item : order.getOrderItems()) {
            Product product = item.getProduct();
            product.setStockQuantity(product.getStockQuantity() + item.getQuantity());
            product.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
            productRepository.save(product);
        }

        order.setOrderStatus("CANCELLED");
        order.setPaymentStatus("REFUNDED");
        order.setUpdatedAt(LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME));
        orderRepository.save(order);
    }
} 