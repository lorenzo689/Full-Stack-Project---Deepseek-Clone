package com.example.backend.chat; 
import jakarta.validation.constraints.NotBlank; 
import org.springframework.web.bind.annotation.*; 
import java.util.List; 

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatMessageRepo repo; 

    public ChatController(ChatMessageRepo repo) {
        this.repo = repo; 
    }; 

    record SendRequest(@NotBlank String content) {

    }; 

    record SendResponse(String reply) {

    }; 

    @GetMapping("/messages")
    public List<ChatMessage> messages() {
        return repo.findAll(); 
    }; 

    @PostMapping("/send")
    public SendResponse send(@RequestBody SendRequest req) {

        ChatMessage user = new ChatMessage(); 
        user.setRole("user"); 
        user.setContent(req.content()); 
        repo.save(user); 

        String reply = "Ok, Ich hab verstanden: " + req.content(); 

        ChatMessage ai = new ChatMessage(); 
        ai.setRole("ai"); 
        ai.setContent(reply); 
        repo.save(ai); 

        return new SendResponse(reply); 
    }; 
}; 
