
export interface Geometry {
    type: string,
    coordinates: number[]
}

export interface Properties {
    mmsi: number,
    sog: number,
    cog: number
    navStat: number,
    rot: number,
    psAcc: string,
    raim: string,
    heading: number,
    timestamp: number,
    timestampExternal: number
}

export interface Feature {
    mmsi: number,
    type: string,
    geometry: Geometry,
    properties: Properties

}

export interface FeatureCollection {
    features: Feature[]
}

export interface Vessel {

    callSign: string,
    destination: string,
    draught: number,
    eta: number,
    imo: number,
    mmsi: number,
    name: string,
    posType: number,
    referencePointA: number,
    referencePointB: number,
    referencePointC: number,
    referencePointD: number,
    shipType: number,
    timestamp: number

}