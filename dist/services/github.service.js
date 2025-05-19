"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubService = void 0;
const axios_1 = __importDefault(require("axios"));
const connect_1 = require("../database/connect");
class GitHubService {
    static fetchGitHubUserData(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const userResponse = yield axios_1.default.get(`https://api.github.com/users/${username}`);
            const reposResponse = yield axios_1.default.get(userResponse.data.repos_url);
            const languages = new Set();
            for (const repo of reposResponse.data) {
                if (repo.language)
                    languages.add(repo.language);
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
        });
    }
    static saveUserToDatabase(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield connect_1.pool.connect();
            try {
                yield client.query("BEGIN");
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
                const result = yield client.query(userInsertQuery, userValues);
                const userId = result.rows[0].id;
                const languageInsertQuery = `
        INSERT INTO programming_languages (user_id, language)
        VALUES ($1, $2);
      `;
                for (const language of userData.languages) {
                    yield client.query(languageInsertQuery, [userId, language]);
                }
                yield client.query("COMMIT");
            }
            catch (error) {
                yield client.query("ROLLBACK");
                throw error;
            }
            finally {
                client.release();
            }
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield connect_1.pool.query("SELECT * FROM github_users");
            return result.rows;
        });
    }
    static getUsersByLocation(location) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield connect_1.pool.query("SELECT * FROM github_users WHERE location = $1", [location]);
            return result.rows;
        });
    }
}
exports.GitHubService = GitHubService;
