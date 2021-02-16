import mongoose, { Schema, Document } from 'mongoose';
import { Feature } from '../types';

export interface IVessel extends Document {
  mmsi: number
  name: string
  destination: string
  features: Feature[]
}

const VesselSchema: Schema = new Schema({
  mmsi: { type: Number, required: true, unique: true },
  name: { type: String },
  destination: { type: String },
  features: [
    {
      mmsi: { type: Number },
      type: { type: String },
      geometry: {
        type: { type: String },
        coordinates: [{ type: Number }]
      },
      properties: {
        mmsi: Number,
        sog: Number,
        cog: Number,
        navStat: Number,
        rot: Number,
        psAcc: String,
        raim: String,
        heading: Number,
        timestamp: Number,
        timestampExternal: Number
      }
    }
  ],
});

export default mongoose.model<IVessel>('Vessel', VesselSchema);