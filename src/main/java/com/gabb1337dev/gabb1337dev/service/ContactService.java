package com.gabb1337dev.gabb1337dev.service;

import com.gabb1337dev.gabb1337dev.model.ContactMessage;
import com.gabb1337dev.gabb1337dev.repository.ContactMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContactService {

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    public List<ContactMessage> findAll() {
        return contactMessageRepository.findAll();
    }

    public Optional<ContactMessage> findById(Long id) {
        return contactMessageRepository.findById(id);
    }

    public ContactMessage save(ContactMessage message) {
        return contactMessageRepository.save(message);
    }

    public void deleteById(Long id) {
        contactMessageRepository.deleteById(id);
    }
} 