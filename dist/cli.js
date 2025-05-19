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
const commander_1 = require("commander");
const axios_1 = __importDefault(require("axios"));
const program = new commander_1.Command();
program
    .command("fetch <username>")
    .description("Fetch GitHub user data and store in the database")
    .action((username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`http://localhost:3300/github/fetch/${username}`);
        console.log(response.data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            console.error("Error fetching user:", error.message);
        }
    }
}));
program
    .command("list")
    .description("List all GitHub users in the database")
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("http://localhost:3300/github/users");
        console.log(response.data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error listing users:", error.message);
        }
    }
}));
program
    .command("list-location <location>")
    .description("List GitHub users in the database by location")
    .action((location) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`http://localhost:3300/github/users/location/${location}`);
        console.log(response.data);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error listing users by location:", error.message);
        }
    }
}));
program.parse(process.argv);
