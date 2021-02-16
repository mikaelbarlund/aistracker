"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const vessels_1 = __importDefault(require("./controllers/vessels"));
const app = express_1.default();
app.use(express_1.default.static('front'));
app.use(cors_1.default());
app.use(express_1.default.json());
app.use('/api/vessels', vessels_1.default);
exports.default = app;
