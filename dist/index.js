"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const connect_1 = __importDefault(require("./database/connect"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.send("hello world");
});
app.post("/", (req, res) => {
    res.send({
        data: req.body,
    });
});
connect_1.default.connect((err) => {
    if (err) {
        console.log("err connecting to db", err);
    }
    else {
        console.log("successfully connected to the database");
        app.listen(3300, () => {
            console.log("app listening on port 3300");
        });
    }
});
