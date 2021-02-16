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
exports.getAisVessels = exports.getAisFeatures = void 0;
const axios_1 = __importDefault(require("axios"));
const getAisFeatures = (from, mmsi) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://meri.digitraffic.fi/api/v1/locations/latest/${mmsi}?from=${from}`, {
        headers: {
            'Accept-Encoding': 'gzip'
        }
    });
    const featureCollection = response.data;
    return featureCollection;
});
exports.getAisFeatures = getAisFeatures;
const getAisVessels = (from) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield axios_1.default.get(`https://meri.digitraffic.fi/api/v1/metadata/vessels?from=${from}`, {
        headers: {
            'Accept-Encoding': 'gzip'
        }
    });
    const vessels = response.data;
    return vessels;
});
exports.getAisVessels = getAisVessels;
