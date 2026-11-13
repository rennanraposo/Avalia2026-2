-- Autenticação real do Projeto 0: T26-2A-2FDD-6CD3-97B0-E36E.
-- Migração inicial: nenhuma conta, sessão ou livro fictício em produção.
PRAGMA foreign_keys = ON;

CREATE TABLE users (
  user_id TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  display_name TEXT NOT NULL,
  avatar TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  token_hash TEXT PRIMARY KEY CHECK(length(token_hash) = 64),
  user_id TEXT NOT NULL REFERENCES users(user_id),
  expires_at INTEGER NOT NULL
);
CREATE INDEX sessions_expiry ON sessions(expires_at);
CREATE INDEX sessions_user ON sessions(user_id);

CREATE TABLE oauth_states (
  state_hash TEXT PRIMARY KEY CHECK(length(state_hash) = 64),
  expires_at INTEGER NOT NULL
);
CREATE INDEX oauth_states_expiry ON oauth_states(expires_at);

