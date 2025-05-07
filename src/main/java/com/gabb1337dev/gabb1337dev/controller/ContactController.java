package com.gabb1337dev.gabb1337dev.controller;

import com.gabb1337dev.gabb1337dev.model.ContactMessage;
import com.gabb1337dev.gabb1337dev.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping
    public ResponseEntity<ContactMessage> createMessage(@RequestBody ContactMessage message) {
        return ResponseEntity.ok(contactService.save(message));
    }

    @GetMapping
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        return ResponseEntity.ok(contactService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ContactMessage> getMessageById(@PathVariable Long id) {
        return contactService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable Long id) {
        return contactService.findById(id)
                .map(message -> {
                    contactService.deleteById(id);
                    return ResponseEntity.ok().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 