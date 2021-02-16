"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let MONGODB_URI = process.env.MONGODB_URI || '';
if (process.env.NODE_ENV === 'test' && process.env.TEST_MONGODB_URI) {
    MONGODB_URI = process.env.TEST_MONGODB_URI;
}
exports.default = {
    MONGODB_URI
};
