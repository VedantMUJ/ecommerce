package com.eshop.service;

import com.eshop.dto.LoginRequest;
import com.eshop.dto.RegisterRequest;
import com.eshop.model.User;
import com.eshop.repository.UserRepository;
import com.eshop.security.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private LoginAttemptService loginAttemptService;

    @Autowired
    private PasswordExpiryService passwordExpiryService;

    @Autowired
    private IpLockoutService ipLockoutService;

    @Autowired
    private SuspiciousActivityService suspiciousActivityService;

    @Autowired
    private HttpServletRequest request;

    public Authentication login(LoginRequest loginRequest) {
        String ipAddress = getClientIp();
        
        // Check IP-based lockout
        if (ipLockoutService.isIpLocked(ipAddress)) {
            throw new BadCredentialsException(ipLockoutService.getLockoutMessage(ipAddress));
        }

        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> {
                    ipLockoutService.handleFailedAttempt(ipAddress);
                    suspiciousActivityService.recordFailedLogin(ipAddress, loginRequest.getUsername());
                    return new BadCredentialsException("Invalid username or password");
                });

        // Check if account is locked
        if (loginAttemptService.isAccountLocked(user)) {
            throw new BadCredentialsException(loginAttemptService.getLockoutMessage(user));
        }

        try {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(),
                    loginRequest.getPassword()
                )
            );

            // Check password expiry
            passwordExpiryService.checkPasswordExpiry(user);

            // Handle successful login
            loginAttemptService.handleSuccessfulLogin(user);
            ipLockoutService.handleSuccessfulAttempt(ipAddress);

            SecurityContextHolder.getContext().setAuthentication(authentication);
            return authentication;
        } catch (BadCredentialsException e) {
            // Handle failed login
            loginAttemptService.handleFailedLogin(user);
            ipLockoutService.handleFailedAttempt(ipAddress);
            suspiciousActivityService.recordFailedLogin(ipAddress, loginRequest.getUsername());
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    private String getClientIp() {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    public User register(RegisterRequest registerRequest) {
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("Username is already taken");
        }

        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("Email is already in use");
        }

        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user.setFirstName(registerRequest.getFirstName());
        user.setLastName(registerRequest.getLastName());
        user.setPhoneNumber(registerRequest.getPhoneNumber());

        Set<String> roles = new HashSet<>();
        roles.add("USER");
        user.setRoles(roles);

        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
        user.setCreatedAt(timestamp);
        user.setUpdatedAt(timestamp);

        return userRepository.save(user);
    }
} 