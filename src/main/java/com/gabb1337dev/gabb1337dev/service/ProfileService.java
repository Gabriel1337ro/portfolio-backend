package com.gabb1337dev.gabb1337dev.service;

import com.gabb1337dev.gabb1337dev.model.Profile;
import com.gabb1337dev.gabb1337dev.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    public Optional<Profile> getProfile() {
        return profileRepository.findAll().stream().findFirst();
    }

    public Profile save(Profile profile) {
        return profileRepository.save(profile);
    }
} 