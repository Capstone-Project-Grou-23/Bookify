package com.example.Backend.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.security.PrivateKey;
import java.util.PrimitiveIterator;

@Getter
@Setter
@AllArgsConstructor
public class UserResponse {
    private Long id;
    private String username;
    private String email;
    private  Role role;
    private  String createdAt;
}

//We’ll use a DTO (Data Transfer Object) to decide what we return.
//👉 Notice we didn’t include password.