import { Set } from 'immutable';
import mongoose from 'mongoose';
import schedule from 'node-schedule';
import { getAisFeatures, getAisVessels } from './AisService';
import config from '../config';
import vessel from '../models/vessel';
import { Feature } from '../types';
mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(
    () => {
      console.log('connected to MongoDB');
    },
    e => console.log(e)
  );


export const job = schedule.scheduleJob('*/30 * * * *', () => {

  const from = new Date().getTime() - (1000 * 60 * 15);
  getAisVessels(from).then(vessels => {
    console.log(new Date(), vessels.length);
    vessels.forEach(v => {
      vessel.findOneAndUpdate({ mmsi: v.mmsi }, { ...v }, { new: true, upsert: true, runValidators: true }).then(
        newV => {
          getAisFeatures(from, newV.mmsi).then(features => {
            const oldFeatures = Set(newV.features);
            const newFeatures = Set(features.features);
            const allFeatures = Set.union([oldFeatures, newFeatures]);
            vessel.updateOne({ mmsi: newV.mmsi }, { features: allFeatures.toArray() as Feature[] }, { new: true, upsert: true, runValidators: true }).then(
              // eslint-disable-next-line @typescript-eslint/no-empty-function
              _ => { }, _ => { }
            );
          }, e => console.log(e)
          );
        }, e => console.log(e)
      );
    });
    console.log(new Date(), 'done');
  }, e => console.log(e));
});
