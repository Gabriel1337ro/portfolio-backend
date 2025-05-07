package com.gabb1337dev.gabb1337dev.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");
        
        // Aquí deberías validar las credenciales contra las configuradas en application.properties
        if ("admin".equals(username) && "admin".equals(password)) {
            Map<String, String> response = new HashMap<>();
            response.put("token", "dummy-token-for-testing");
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.status(401).body("Credenciales inválidas");
    }
} 