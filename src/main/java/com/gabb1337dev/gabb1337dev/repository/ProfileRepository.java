package com.gabb1337dev.gabb1337dev.repository;

import com.gabb1337dev.gabb1337dev.model.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
} 