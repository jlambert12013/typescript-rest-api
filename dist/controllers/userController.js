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
exports.loginUser = exports.registerUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = require("bcrypt");
const generateToken_1 = __importDefault(require("../utils/generateToken"));
// REGISTRATION - NEW USERS CONTROLLER
// @desc    Register User
// @route   POST /api/user/register
// @params  firstName, lastName, email, password
// @access  Public
exports.registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    if (!firstName || !lastName || !email || !password) {
        res.status(400).json({ message: 'PLEASE INCLUDE ALL REQUIRED FIELDS' });
    }
    // Check for Duplication
    const userExists = yield User_1.default.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error(`${email} is already in use. Please login or use a different email addess to sign up.`);
    }
    // Hash Password using Bcrypt Salt
    const salt = yield (0, bcrypt_1.genSalt)(10);
    const hashedPassword = yield (0, bcrypt_1.hash)(password, salt);
    // Create User
    const user = yield User_1.default.create({
        _id: new mongoose_1.default.Types.ObjectId(),
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });
    // Store New User
    if (user) {
        user.save();
        res.status(201).json({
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            token: (0, generateToken_1.default)(user._id),
        });
    }
    else {
        res.status(400);
        throw new Error('Could not register user. Please try again later.');
    }
}));
// LOGIN - LOGIN CONTROLLER
// @desc    Login user
// @route   POST /api/user/login
// @params  email, password
// @access  Public
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = yield req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error('Please provide a valid email and password.');
    }
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error(`${email} doesn't exsist.`);
    }
    if (user && (yield (0, bcrypt_1.compare)(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.firstName,
            email: user.email,
        });
    }
    else {
        res.status(400);
        throw new Error('Login failed. Please try again.');
    }
}));
