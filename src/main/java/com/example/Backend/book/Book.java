package com.example.Backend.book;

import jakarta.persistence.*;
import java.math.BigDecimal;
import com.example.Backend.user.User;
import jakarta.persistence.ManyToOne;

import java.time.Instant;

@Entity
@Table(name = "books")
public class Book {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @Column(nullable = false)
    private String title;


    private String author;


    @Column(length = 2000)
    private String description;


    @Column(nullable = false)
    private BigDecimal price;


    private String conditionLabel; // e.g., LIKE_NEW, GOOD, FAIR
    private String category; // e.g., Fiction, CS, Exam Prep
    private String imageUrl;


    @ManyToOne(optional = false)
    private User seller; // FK to users


    private boolean available = true;
    private Instant createdAt = Instant.now();



}