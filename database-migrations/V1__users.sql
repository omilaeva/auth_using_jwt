CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password_hash TEXT NOT NULL
 );

CREATE UNIQUE INDEX ON users(lower(username));