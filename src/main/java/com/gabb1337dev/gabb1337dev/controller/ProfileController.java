package com.gabb1337dev.gabb1337dev.controller;

import com.gabb1337dev.gabb1337dev.model.Profile;
import com.gabb1337dev.gabb1337dev.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin(origins = "*")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @GetMapping
    public ResponseEntity<Profile> getProfile() {
        return profileService.getProfile()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping
    public ResponseEntity<Profile> updateProfile(@RequestBody Profile profile) {
        return ResponseEntity.ok(profileService.save(profile));
    }
} 