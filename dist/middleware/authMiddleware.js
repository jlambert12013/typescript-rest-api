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
exports.protect = void 0;
const config_1 = require("../config/config");
const log_1 = __importDefault(require("../library/log"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
function protect(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let token;
        if (req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')) {
            try {
                // Get token from header
                token = req.headers.authorization.split(' ')[1];
                // Verify token
                const decoded = jsonwebtoken_1.default.verify(token, config_1.config.jwt.key);
                // Get user from token
                yield User_1.default.findById(decoded).select('-password');
                next();
            }
            catch (error) {
                log_1.default.error(error);
                res.status(401);
                throw new Error('Not Authorized.');
            }
        }
        if (!token) {
            res.status(401);
            throw new Error('Not Authorized, no token.');
        }
    });
}
exports.protect = protect;
