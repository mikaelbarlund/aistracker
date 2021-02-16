"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CronService_1 = require("./services/CronService");
const app_1 = __importDefault(require("./app"));
const PORT = process.env.PORT || 3001;
console.log(`started job ${CronService_1.job.name}`);
app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
