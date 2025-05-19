"use strict";
// schemaSetup.js
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
const connect_1 = require("./connect");
const githubuser_model_1 = require("./githubuser.model");
const createSchemas = () => __awaiter(void 0, void 0, void 0, function* () {
    const client = yield connect_1.pool.connect();
    try {
        yield client.query("BEGIN");
        yield client.query(githubuser_model_1.githubUserSchema);
        yield client.query(githubuser_model_1.programmingLanguageSchema);
        yield client.query("COMMIT");
        console.log("Schemas created successfully");
    }
    catch (error) {
        yield client.query("ROLLBACK");
        console.error("Error creating schemas", error);
    }
    finally {
        client.release();
    }
});
exports.default = createSchemas;
