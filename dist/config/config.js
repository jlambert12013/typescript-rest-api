"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_USERNAME = (_a = process.env.MONGO_USERNAME) !== null && _a !== void 0 ? _a : '';
const MONGO_PASSWORD = (_b = process.env.MONGO_PASSWORD) !== null && _b !== void 0 ? _b : '';
const JWT_KEY = (_c = process.env.JWT_SECRET) !== null && _c !== void 0 ? _c : '';
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.y9nsn.mongodb.net`;
const SERVER_PORT = process.env.SERVER_PORT
    ? Number(process.env.SERVER_PORT)
    : 1337;
exports.config = {
    mongo: { uri: MONGO_URI },
    server: { port: SERVER_PORT },
    jwt: { key: JWT_KEY },
};
