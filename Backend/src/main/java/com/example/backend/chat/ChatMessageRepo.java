package com.example.backend.chat; 
import org.springframework.data.jpa.repository.JpaRepository; 

public interface ChatMessageRepo extends JpaRepository<ChatMessage, Long> {

}; 