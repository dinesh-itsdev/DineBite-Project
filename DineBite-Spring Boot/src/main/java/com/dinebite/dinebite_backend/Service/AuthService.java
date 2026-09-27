package com.dinebite.dinebite_backend.Service;

import com.dinebite.dinebite_backend.Entity.User;
import com.dinebite.dinebite_backend.Repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // =========================
    // REGISTER
    // =========================
    public User register(User user) {

        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        // Remove accidental spaces
        String email = user.getEmail().trim();

        // Save email in lowercase
        email = email.toLowerCase();

        user.setEmail(email);

        // Check whether email already exists
        Optional<User> existingUser =
                userRepository.findByEmail(email);

        if (existingUser.isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // Default role
        if (user.getRole() == null ||
                user.getRole().trim().isEmpty()) {

            user.setRole("USER");
        }

        return userRepository.save(user);
    }


    // =========================
    // LOGIN
    // =========================
    public User login(String email, String password) {

        if (email == null || email.trim().isEmpty()) {
            throw new RuntimeException("Email is required");
        }

        if (password == null || password.isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        // Remove accidental spaces
        String cleanEmail = email.trim().toLowerCase();

        // Find user by email
        Optional<User> user =
                userRepository.findByEmail(cleanEmail);

        if (user.isEmpty()) {
            throw new RuntimeException(
                    "User not found with email: " + cleanEmail
            );
        }

        User existingUser = user.get();

        // Check password
        if (!existingUser.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        // Login successful
        return existingUser;
    }
}