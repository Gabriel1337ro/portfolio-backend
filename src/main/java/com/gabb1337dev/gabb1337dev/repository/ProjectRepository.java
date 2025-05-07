package com.gabb1337dev.gabb1337dev.repository;

import com.gabb1337dev.gabb1337dev.model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
} 