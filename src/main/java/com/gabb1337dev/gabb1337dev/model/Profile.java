package com.gabb1337dev.gabb1337dev.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "profiles")
public class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(name = "job_title")
    private String jobTitle;

    @Column(length = 2000)
    private String about;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "linkedin_url")
    private String linkedinUrl;

    @Column(name = "github_url")
    private String githubUrl;

    @Column(name = "twitter_url")
    private String twitterUrl;

    @Column
    private String location;

    @Column
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "cv_url")
    private String cvUrl;
} 