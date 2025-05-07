package com.gabb1337dev.gabb1337dev.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Permitir orígenes específicos
        config.setAllowedOrigins(Arrays.asList(
            "http://localhost:4200",
            "https://gabb1337dev-aim1q1ep5-gabriel1337ros-projects.vercel.app"
        ));
        
        // Permitir métodos HTTP específicos
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        
        // Permitir todos los headers
        config.setAllowedHeaders(Arrays.asList("*"));
        
        // Permitir credenciales
        config.setAllowCredentials(true);
        
        // Exponer headers específicos
        config.setExposedHeaders(Arrays.asList("Authorization"));
        
        // Aplicar esta configuración a todas las rutas
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
} 