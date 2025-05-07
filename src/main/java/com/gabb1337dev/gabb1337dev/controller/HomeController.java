package com.gabb1337dev.gabb1337dev.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/")
    public String home() {
        return "¡Bienvenido a la API de Gabb1337!";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }

    @GetMapping("/db-test")
    public String dbTest() {
        try {
            jdbcTemplate.queryForObject("SELECT 1", Integer.class);
            return "Conexión a la base de datos exitosa";
        } catch (Exception e) {
            return "Error en la conexión a la base de datos: " + e.getMessage();
        }
    }
} 