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
    private String url ;

    public UserModel() {
    }

    public UserModel(String username, String url) {
        this.username = username;
        this.url = url;

    }
    public String getUrl() {
        return url;
    }
    public void setUrl(String url) {
        this.url = url;
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
