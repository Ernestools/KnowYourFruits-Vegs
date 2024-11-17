package com.example.demo.models;

import jakarta.persistence.*;


@Entity
@Table
public class QuizModel {
    @Id
    @Column(name = "id")
    private String id;
    @Column(name = "imageUrl")
    private String imageUrl;
    @Column(name = "label")
    private String label;

    public QuizModel() {
    }

    public QuizModel(String imageUrl, String label) {
        this.imageUrl = imageUrl;
        this.label = label;
    }

    public QuizModel(String id, String imageUrl, String label) {
        this.id = id;
        this.imageUrl = imageUrl;
        this.label = label;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
