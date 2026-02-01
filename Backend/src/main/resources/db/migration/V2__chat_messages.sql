create table chat_messages (
  id bigserial primary key,
  role text not null,
  content text not null,
  created_at timestamptz not null default now()
);
