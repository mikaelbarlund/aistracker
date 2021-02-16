"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vessel_1 = __importDefault(require("../../models/vessel"));
const router = express_1.default.Router();
router.get('/', (_request, response) => {
    vessel_1.default.find({}).then(a => {
        response.json(a.filter(v => v.features.find(f => f.properties.timestampExternal > Date.now() - (7 * 24 * 60 * 60 * 1000))));
    }, e => console.log(e));
});
exports.default = router;
