package com.example.backend.todo;

import jakarta.validation.constraints.NotBlank;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
  private final TodoRepo repo;

  public TodoController(TodoRepo repo) {
    this.repo = repo;
  }

  record CreateTodo(@NotBlank String title) {}

  @GetMapping
  public List<Todo> all() {
    return repo.findAll();
  }

  @PostMapping
  public Todo create(@RequestBody CreateTodo dto) {
    Todo t = new Todo();
    t.setTitle(dto.title());
    return repo.save(t);
  }
}

