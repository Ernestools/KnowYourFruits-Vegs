package com.example.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table
public class ClassModel {
    @Id
    @Column(name = "id")
    private String id;
    @Column(name = "label")
    private String label;

    public ClassModel(String id, String label) {
        this.id = id;
        this.label = label;
    }

    public ClassModel(String label) {
        this.label = label;
    }

    public ClassModel() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}
