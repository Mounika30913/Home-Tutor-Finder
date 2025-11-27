package com.hometutorfinder.backend.controller;

import com.hometutorfinder.backend.model.User;
import com.hometutorfinder.backend.repository.UserRepository;
import com.hometutorfinder.backend.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthController(UserRepository userRepository,
                          PasswordEncoder passwordEncoder,
                          JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public Map<String, Object> register(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String rawPass = body.get("password");
        String role = body.getOrDefault("role", "STUDENT").toUpperCase();

        if (userRepository.findByEmail(email).isPresent()) {
            return Map.of("error", "Email already exists");
        }

        User u = new User();
        u.setEmail(email);
        u.setPassword(passwordEncoder.encode(rawPass));
        u.setRole(role);
        userRepository.save(u);

        String token = jwtUtil.generateToken(email, 1000L * 60 * 60 * 24 * 7);
        return Map.of("token", token);
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String rawPass = body.get("password");

        User u = userRepository.findByEmail(email).orElse(null);

        if (u == null || !passwordEncoder.matches(rawPass, u.getPassword())) {
            return Map.of("error", "Invalid credentials");
        }

        String token = jwtUtil.generateToken(email, 1000L * 60 * 60 * 24 * 7);
        return Map.of("token", token);
    }
}
