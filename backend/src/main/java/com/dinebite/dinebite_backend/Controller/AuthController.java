package com.dinebite.dinebite_backend.Controller;

import com.dinebite.dinebite_backend.Entity.User;
import com.dinebite.dinebite_backend.Service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // =========================
    // REGISTER
    // =========================
    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {

        User registeredUser = authService.register(user);

        return ResponseEntity.ok(registeredUser);
    }

    // =========================
    // LOGIN
    // =========================
    @PostMapping("/login")
    public ResponseEntity<User> login(
            @RequestBody LoginRequest request) {

        User loggedInUser =
                authService.login(
                        request.getEmail(),
                        request.getPassword()
                );

        return ResponseEntity.ok(loggedInUser);
    }

    // =========================
    // LOGIN REQUEST
    // =========================
    public static class LoginRequest {

        private String email;
        private String password;

        public LoginRequest() {
        }

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}