package com.gabb1337.portfolio.config;

import com.gabb1337.portfolio.model.User;
import com.gabb1337.portfolio.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {
    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmail("admin@gabb1337.dev")) {
            User admin = new User();
            admin.setEmail("admin@gabb1337.dev");
            admin.setPassword("admin123");
            admin.setName("Admin");
            admin.setRole(User.Role.ADMIN);
            userRepository.save(admin);
        }
    }
} 