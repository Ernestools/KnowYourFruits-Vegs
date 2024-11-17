package com.example.demo.models;

import jakarta.persistence.*;

@Entity
@Table
public class UserModel {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private String id;
    @Column(name = "username")
    private String username;

    public UserModel(String id, String username) {
        this.id = id;
        this.username = username;
    }

    public UserModel(String username) {
        this.username = username;
    }

    public UserModel() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}
