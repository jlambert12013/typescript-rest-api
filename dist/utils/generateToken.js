"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
//  CREATE A JSON WEB TOKEN
exports.default = (_id) => {
    return jsonwebtoken_1.default.sign({ _id }, config_1.config.jwt.key, { expiresIn: '30d' });
};
