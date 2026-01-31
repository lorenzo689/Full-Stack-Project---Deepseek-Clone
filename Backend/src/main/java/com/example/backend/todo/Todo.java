package com.example.backend.todo;

import jakarta.persistence.*;

@Entity
@Table(name = "todos")
public class Todo {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  private boolean done = false;

  public Long getId() { return id; }
  public String getTitle() { return title; }
  public boolean isDone() { return done; }

  public void setTitle(String title) { this.title = title; }
  public void setDone(boolean done) { this.done = done; }
}

