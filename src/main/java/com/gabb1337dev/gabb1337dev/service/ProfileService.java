package com.gabb1337dev.gabb1337dev.service;

import com.gabb1337dev.gabb1337dev.model.Profile;
import com.gabb1337dev.gabb1337dev.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    private final Path uploadDir = Paths.get("uploads");

    public ProfileService() {
        try {
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory!", e);
        }
    }

    public Profile getProfile() {
        return profileRepository.findAll().stream()
                .findFirst()
                .orElseGet(() -> {
                    Profile defaultProfile = new Profile();
                    defaultProfile.setName("Tu Nombre");
                    defaultProfile.setTitle("Tu Título");
                    defaultProfile.setDescription("Tu descripción");
                    defaultProfile.setEmail("tu@email.com");
                    return profileRepository.save(defaultProfile);
                });
    }

    public Profile updateProfile(Profile profile) {
        Profile existingProfile = getProfile();
        profile.setId(existingProfile.getId());
        return profileRepository.save(profile);
    }

    public String uploadImage(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = uploadDir.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);
        return "/uploads/" + fileName;
    }
} 