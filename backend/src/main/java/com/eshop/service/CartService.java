package com.eshop.service;

import com.eshop.dto.CartItemDto;
import com.eshop.exception.CartException;
import com.eshop.model.*;
import com.eshop.repository.CartItemRepository;
import com.eshop.repository.CartRepository;
import com.eshop.repository.ProductRepository;
import com.eshop.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Cart getOrCreateCart(User user) {
        return cartRepository.findByUser(user)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    newCart.setTotalPrice(BigDecimal.ZERO);
                    return cartRepository.save(newCart);
                });
    }

    @Transactional
    public Cart saveCart(User user, List<CartItemDto> cartItems) {
        Cart cart = getOrCreateCart(user);
        cart.getCartItems().clear();
        
        for (CartItemDto itemDto : cartItems) {
            Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(itemDto.getQuantity());
            cartItem.setUnitPrice(product.getPrice());
            cartItem.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(itemDto.getQuantity())));
            
            cart.getCartItems().add(cartItem);
        }
        
        updateCartTotal(cart);
        return cartRepository.save(cart);
    }

    @Transactional
    public Cart mergeCarts(User user, List<CartItemDto> guestCartItems) {
        Cart userCart = getOrCreateCart(user);
        
        for (CartItemDto itemDto : guestCartItems) {
            Product product = productRepository.findById(itemDto.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            
            Optional<CartItem> existingItem = cartItemRepository.findByCartAndProduct(userCart, product);
            
            if (existingItem.isPresent()) {
                CartItem cartItem = existingItem.get();
                cartItem.setQuantity(cartItem.getQuantity() + itemDto.getQuantity());
                cartItem.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
            } else {
                CartItem cartItem = new CartItem();
                cartItem.setCart(userCart);
                cartItem.setProduct(product);
                cartItem.setQuantity(itemDto.getQuantity());
                cartItem.setUnitPrice(product.getPrice());
                cartItem.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(itemDto.getQuantity())));
                userCart.getCartItems().add(cartItem);
            }
        }
        
        updateCartTotal(userCart);
        return cartRepository.save(userCart);
    }

    @Transactional
    public Cart addToCart(User user, CartItemDto cartItemDto) {
        Cart cart = getOrCreateCart(user);
        Product product = productRepository.findById(cartItemDto.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (!product.isActive()) {
            throw new RuntimeException("Product is not available");
        }

        if (product.getStockQuantity() < cartItemDto.getQuantity()) {
            throw new RuntimeException("Insufficient stock for product: " + product.getName());
        }

        Optional<CartItem> existingItem = cartItemRepository.findByCartAndProduct(cart, product);

        if (existingItem.isPresent()) {
            CartItem cartItem = existingItem.get();
            int newQuantity = cartItem.getQuantity() + cartItemDto.getQuantity();
            
            if (newQuantity > product.getStockQuantity()) {
                throw new RuntimeException("Cannot add more items. Available quantity: " + 
                        (product.getStockQuantity() - cartItem.getQuantity()));
            }

            cartItem.setQuantity(newQuantity);
            cartItem.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(newQuantity)));
            cartItemRepository.save(cartItem);
        } else {
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setQuantity(cartItemDto.getQuantity());
            cartItem.setUnitPrice(product.getPrice());
            cartItem.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(cartItemDto.getQuantity())));
            cart.getCartItems().add(cartItem);
        }

        updateCartTotal(cart);
        return cartRepository.save(cart);
    }

    @Transactional
    public Cart updateCartItem(User user, Long itemId, CartItemDto cartItemDto) {
        Cart cart = getOrCreateCart(user);
        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new RuntimeException("Cart item does not belong to user's cart");
        }

        Product product = cartItem.getProduct();
        if (cartItemDto.getQuantity() > product.getStockQuantity()) {
            throw new RuntimeException("Insufficient stock for product: " + product.getName());
        }

        cartItem.setQuantity(cartItemDto.getQuantity());
        cartItem.setTotalPrice(product.getPrice().multiply(BigDecimal.valueOf(cartItemDto.getQuantity())));
        cartItemRepository.save(cartItem);

        updateCartTotal(cart);
        return cartRepository.save(cart);
    }

    @Transactional
    public Cart removeFromCart(User user, Long itemId) {
        Cart cart = getOrCreateCart(user);
        CartItem cartItem = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new RuntimeException("Cart item does not belong to user's cart");
        }

        cart.getCartItems().remove(cartItem);
        cartItemRepository.delete(cartItem);

        updateCartTotal(cart);
        return cartRepository.save(cart);
    }

    @Transactional
    public void clearCart(User user) {
        Cart cart = getOrCreateCart(user);
        cartItemRepository.deleteByCart(cart);
        cart.getCartItems().clear();
        cart.setTotalPrice(BigDecimal.ZERO);
        cartRepository.save(cart);
    }

    private void updateCartTotal(Cart cart) {
        BigDecimal total = cart.getCartItems().stream()
                .map(CartItem::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        cart.setTotalPrice(total);
    }
} 