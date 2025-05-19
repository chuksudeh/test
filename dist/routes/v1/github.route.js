"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const github_controller_1 = require("../../controllers/github.controller");
const router = express_1.default.Router();
router.get("/fetch/:username", github_controller_1.fetchGitHubUser);
router.get("/users", github_controller_1.listUsers);
router.get("/users/location/:location", github_controller_1.listUsersByLocation);
exports.default = router;
