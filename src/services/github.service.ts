import axios from "axios";
import { pool } from "../database/connect";

export class GitHubService {
  static async fetchGitHubUserData(username: string) {
    const userResponse = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const reposResponse = await axios.get(userResponse.data.repos_url);
    const languages = new Set<string>();
    for (const repo of reposResponse.data) {
      if (repo.language) languages.add(repo.language);
    }

    return {
      username: userResponse.data.login,
      name: userResponse.data.name,
      location: userResponse.data.location,
      bio: userResponse.data.bio,
      public_repos: userResponse.data.public_repos,
      followers: userResponse.data.followers,
      following: userResponse.data.following,
      languages: Array.from(languages),
    };
  }

  static async saveUserToDatabase(userData: any) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const userInsertQuery = `
        INSERT INTO github_users (username, name, location, bio, public_repos, followers, following)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id;
      `;
      const userValues = [
        userData.username,
        userData.name,
        userData.location,
        userData.bio,
        userData.public_repos,
        userData.followers,
        userData.following,
      ];
      const result = await client.query(userInsertQuery, userValues);
      const userId = result.rows[0].id;

      const languageInsertQuery = `
        INSERT INTO programming_languages (user_id, language)
        VALUES ($1, $2);
      `;
      for (const language of userData.languages) {
        await client.query(languageInsertQuery, [userId, language]);
      }

      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  static async getAllUsers() {
    const result = await pool.query("SELECT * FROM github_users");
    return result.rows;
  }

  static async getUsersByLocation(location: string) {
    const result = await pool.query(
      "SELECT * FROM github_users WHERE location = $1",
      [location]
    );
    return result.rows;
  }
}
