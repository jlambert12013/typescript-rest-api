"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config/config");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const log_1 = __importDefault(require("./library/log"));
const userRouter_1 = __importDefault(require("./routes/api/userRouter"));
const app = (0, express_1.default)();
exports.default = () => {
    // Request
    app.use((req, res, next) => {
        log_1.default.success(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - Ip: [${req.socket.remoteAddress}]`);
        // Response
        res.on('finish', () => {
            log_1.default.success(`Incoming -> Method: [${req.method}] - URL: [${req.url}] - Ip: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
        });
        next();
    });
    // Middleware
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use(express_1.default.json());
    //  API Rules and Options
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    // MARK: Routes
    app.use('/api/user', userRouter_1.default);
    // MARK: Health Check
    app.all('/ping', (_req, res) => res.status(200).json({ message: 'SUCCESS' }));
    // MARK: Error Handler
    app.use((_req, res) => {
        const error = new Error('ROUTE WAS NOT FOUND...');
        log_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    // MARK: Create Server
    http_1.default.createServer(app).listen(config_1.config.server.port, () => {
        log_1.default.success(`SERVER RUNNING ON PORT ${config_1.config.server.port}`);
    });
};
