import axios from "axios";
import { FeatureCollection, Vessel } from "../types";


export const getAisFeatures = async (from: number, mmsi: number): Promise<FeatureCollection> => {
  const response = await axios.get(`https://meri.digitraffic.fi/api/v1/locations/latest/${mmsi}?from=${from}`, {
    headers: {
      'Accept-Encoding': 'gzip'
    }
  });
  const featureCollection: FeatureCollection = response.data as FeatureCollection;
  return featureCollection;
};

export const getAisVessels = async (from: number): Promise<Vessel[]> => {
  const response = await axios.get(`https://meri.digitraffic.fi/api/v1/metadata/vessels?from=${from}`, {
    headers: {
      'Accept-Encoding': 'gzip'
    }
  });
  const vessels: Vessel[] = response.data as Vessel[];
  return vessels;
};