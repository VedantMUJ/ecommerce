package com.eshop.service;

import com.eshop.model.User; // Assuming your User entity path
import com.eshop.repository.UserRepository; // Assuming your UserRepository path
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;
// import java.util.Collections; // If roles are simple or not yet implemented

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String usernameOrEmail) throws UsernameNotFoundException {
        // Adjust findByUsername to whatever method you use for login (e.g., findByEmail)
        User user = userRepository.findByUsername(usernameOrEmail) // Or findByEmail, etc.
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with username or email: " + usernameOrEmail));

        // Example: Assuming your User entity has a getRoles() method returning a Set<Role>
        // and Role entity has a getName() method. Adjust as per your User & Role structure.
        Collection<? extends GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(user.getEmail(), // or user.getUsername()
                user.getPassword(), authorities);
    }
}