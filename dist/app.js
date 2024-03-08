"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config/config");
const mongoose_1 = require("mongoose");
const log_1 = __importDefault(require("./library/log"));
const server_1 = __importDefault(require("./server"));
(0, mongoose_1.connect)(config_1.config.mongo.uri, {
    retryWrites: true,
    w: 'majority',
})
    .then(() => {
    log_1.default.success('MONGO CONNECTED'); // MONGO CONNECTED
    (0, server_1.default)(); // START SERVER
})
    .catch(() => {
    log_1.default.error('MONGO CONNECTION FAILED'); // MONGO FAILED
});
