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
Object.defineProperty(exports, "__esModule", { value: true });
exports.listUsersByLocation = exports.listUsers = exports.fetchGitHubUser = void 0;
const github_service_1 = require("../services/github.service");
const connect_1 = require("../database/connect");
const githubuser_model_1 = require("../database/githubuser.model");
const fetchGitHubUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    try {
        connect_1.pool.query(githubuser_model_1.githubUserSchema);
        const userData = yield github_service_1.GitHubService.fetchGitHubUserData(username);
        yield github_service_1.GitHubService.saveUserToDatabase(userData);
        res.status(200).json({
            message: "User data fetched and saved successfully",
            data: userData,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    }
});
exports.fetchGitHubUser = fetchGitHubUser;
const listUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield github_service_1.GitHubService.getAllUsers();
        res.status(200).json({ message: "Success", data: users });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    }
});
exports.listUsers = listUsers;
const listUsersByLocation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { location } = req.params;
    try {
        const users = yield github_service_1.GitHubService.getUsersByLocation(location);
        res.status(200).json({ message: "Success", data: users });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
            res.status(500).json({ message: "Internal server error" });
        }
    }
});
exports.listUsersByLocation = listUsersByLocation;
