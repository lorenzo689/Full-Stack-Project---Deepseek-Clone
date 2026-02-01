package com.example.backend.chat; 
import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "chat_messages")
public class ChatMessage {
    @Id  
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
    
    @Column(nullable = false)
    private String role;
    
    @Column(nullable = false, columnDefinition = "text")
    private String content; 

    @Column(name = "created_at", nullable = false) 
        private OffsetDateTime createdAt; 

    @PrePersist
    void prePersist() {
        if (createdAt == null) createdAt = OffsetDateTime.now(); 
    }; 

    public Long getId() {
        return id; 
    }; 

    public String getRole() {
        return role; 
    }; 

    public String getContent() {
        return content; 
    }; 

    public OffsetDateTime getCreatedAt() {
        return createdAt; 
    }; 

    public void setRole(String role) {
        this.role = role; 
    }; 

    public void setContent(String content) {
        this.content = content; 
    }; 
}; 