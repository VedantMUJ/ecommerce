package com.eshop.controller;

import com.eshop.dto.CartItemDto;
import com.eshop.model.Cart;
import com.eshop.model.User;
import com.eshop.service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public ResponseEntity<?> getCart(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Cart cart = cartService.getOrCreateCart(user);
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/items")
    public ResponseEntity<?> addToCart(@Valid @RequestBody CartItemDto cartItemDto, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Cart cart = cartService.addToCart(user, cartItemDto);
        return ResponseEntity.ok(cart);
    }

    @PutMapping("/items/{itemId}")
    public ResponseEntity<?> updateCartItem(
            @PathVariable Long itemId,
            @Valid @RequestBody CartItemDto cartItemDto,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Cart cart = cartService.updateCartItem(user, itemId, cartItemDto);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping("/items/{itemId}")
    public ResponseEntity<?> removeFromCart(@PathVariable Long itemId, Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        Cart cart = cartService.removeFromCart(user, itemId);
        return ResponseEntity.ok(cart);
    }

    @DeleteMapping
    public ResponseEntity<?> clearCart(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        cartService.clearCart(user);
        return ResponseEntity.ok().build();
    }
} 