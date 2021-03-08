"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const compression_1 = __importDefault(require("compression"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./config"));
const vessels_1 = __importDefault(require("./controllers/vessels"));
const app = express_1.default();
app.use(express_1.default.static('front'));
app.use(compression_1.default());
app.use(cors_1.default());
app.use(express_1.default.json());
mongoose_1.default.connect(config_1.default.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
    console.log('connected to MongoDB');
}, e => console.log(e));
app.use('/api/vessels', vessels_1.default);
exports.default = app;
