package com.example.backend.chat; 
import com.example.backend.deepseek.DeepSeekService;
import jakarta.validation.constraints.NotBlank; 
import org.springframework.web.bind.annotation.*; 
import java.util.List; 

@RestController
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatMessageRepo repo; 
    private final DeepSeekService deepSeekService;

    public ChatController(ChatMessageRepo repo, DeepSeekService deepSeekService) {
        this.repo = repo; 
        this.deepSeekService = deepSeekService;
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

        String reply = deepSeekService.chat(req.content());

        ChatMessage ai = new ChatMessage(); 
        ai.setRole("ai"); 
        ai.setContent(reply); 
        repo.save(ai); 

        return new SendResponse(reply); 
    };
}; 
