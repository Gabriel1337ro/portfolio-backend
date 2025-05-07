package com.gabb1337dev.gabb1337dev.repository;

import com.gabb1337dev.gabb1337dev.model.ContactMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContactMessageRepository extends JpaRepository<ContactMessage, Long> {
} 