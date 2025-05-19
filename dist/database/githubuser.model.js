"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.programmingLanguageSchema = exports.githubUserSchema = void 0;
exports.githubUserSchema = `
CREATE TABLE IF NOT EXISTS github_users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  name VARCHAR(100),
  location VARCHAR(100),
  bio TEXT,
  public_repos INT,
  followers INT,
  following INT
);
`;
exports.programmingLanguageSchema = `
CREATE TABLE IF NOT EXISTS programming_languages (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES github_users(id),
  language VARCHAR(50) NOT NULL
);
`;
