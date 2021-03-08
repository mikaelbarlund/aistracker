"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = require("immutable");
const mongoose_1 = __importDefault(require("mongoose"));
const AisService_1 = require("../services/AisService");
const config_1 = __importDefault(require("../config"));
const vessel_1 = __importDefault(require("../models/vessel"));
const task = () => {
    mongoose_1.default.connect(config_1.default.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then(() => {
        console.log('connected to MongoDB');
        const from = new Date().getTime() - (1000 * 60 * 15);
        AisService_1.getAisVessels(from).then(vessels => {
            console.log(new Date(), vessels.length);
            vessels.forEach(v => {
                vessel_1.default.findOneAndUpdate({ mmsi: v.mmsi }, Object.assign({}, v), { new: true, upsert: true, runValidators: true }).then(newV => {
                    AisService_1.getAisFeatures(from, newV.mmsi).then(features => {
                        const oldFeatures = immutable_1.Set(newV.features);
                        const newFeatures = immutable_1.Set(features.features);
                        const allFeatures = immutable_1.Set.union([oldFeatures, newFeatures]);
                        vessel_1.default.updateOne({ mmsi: newV.mmsi }, { features: allFeatures.toArray() }, { new: true, upsert: true, runValidators: true }).then(_ => {
                            console.log(new Date(), 'done saving vessels!');
                            // eslint-disable-next-line @typescript-eslint/no-empty-function
                        }, _ => { });
                    }, e => console.log(e));
                }, e => console.log(e));
            });
            console.log(new Date(), 'done getting vessels!');
        }, e => console.log(e));
    }, e => console.log(e));
};
task();
