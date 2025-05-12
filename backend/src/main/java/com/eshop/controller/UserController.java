package com.eshop.controller;

import com.eshop.dto.ChangePasswordDto;
import com.eshop.dto.UserDto;
import com.eshop.model.User;
import com.eshop.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserDto userDto) {
        User user = userService.createUser(userDto);
        return ResponseEntity.ok(user);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserDto userDto,
            Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        if (!currentUser.getId().equals(id) && !currentUser.getRole().equals("ROLE_ADMIN")) {
            return ResponseEntity.status(403).body("Access denied");
        }

        User user = userService.updateUser(id, userDto);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(
            @PathVariable Long id,
            Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        if (!currentUser.getId().equals(id) && !currentUser.getRole().equals("ROLE_ADMIN")) {
            return ResponseEntity.status(403).body("Access denied");
        }

        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(
            @PathVariable Long id,
            Authentication authentication) {
        User currentUser = (User) authentication.getPrincipal();
        if (!currentUser.getId().equals(id) && !currentUser.getRole().equals("ROLE_ADMIN")) {
            return ResponseEntity.status(403).body("Access denied");
        }

        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok(user);
    }

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(
            @Valid @RequestBody ChangePasswordDto changePasswordDto,
            Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        userService.changePassword(
            user.getId(),
            changePasswordDto.getCurrentPassword(),
            changePasswordDto.getNewPassword()
        );
        return ResponseEntity.ok().build();
    }
} 