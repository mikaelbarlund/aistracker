import { Set } from 'immutable';
import mongoose from 'mongoose';
import { getAisFeatures, getAisVessels } from '../services/AisService';
import config from '../config';
import vessel from '../models/vessel';
import { Feature } from '../types';

const task = () => {
  mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(
      () => {
        console.log('connected to MongoDB');
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
                    _ => {
                      console.log(new Date(), 'done saving vessels!');
                      // eslint-disable-next-line @typescript-eslint/no-empty-function
                    }, _ => { }
                  );
                }, e => console.log(e)
                );
              }, e => console.log(e)
            );
          });
          console.log(new Date(), 'done getting vessels!');
        }, e => console.log(e));
      },
      e => console.log(e)
    );
};
task();



