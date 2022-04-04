import * as moment from 'moment';

export interface Position {
  type: string;
  coordinates: number[]; // [lng, lat]
}

export interface Measurement {
  timestamp: string;
  persons: number;
}

export interface MeasurementsListInfo {
  start_date: string;
  end_date: string;
  measurement: Measurement[];
  measurement_count: number;
  person_total: number;
}


export interface CameraInfo {
  _id: string;
  id: number;
  name: string;
  position: Position;
  floor?: number;
}

/*
{
  "_id": "604e63c165213a3d4515222e",
  "id": 2211,
  "position": {
    "type": "Point",
    "coordinates": [
      14.789114,
      40.775174
    ]
  },
  "floor": 1,
  "measurements": {
    "start_date": "2021-03-14T20:28:00.000Z",
    "end_date": "2021-03-14T20:28:59.000Z",
    "measurement": [
      {
        "timestamp": "2021-03-14T20:28:01.436Z",
        "persons": 19
      },
      {
        "timestamp": "2021-03-14T20:28:31.436Z",
        "persons": 26
      }
    ],
    "measurement_count": 2,
    "persons_total": 45
  },
  "persons": 22.5
}
 */
export interface CameraMeasurement {
  _id: string;
  id: number;
  name: string;
  position: Position;
  floor: number;
  measurements: MeasurementsListInfo;
  persons: number;
  distance?: number;
}

/**
 * Maintains information retrieved form server
 */
export interface CameraSearch {
  timelineDates: moment.Moment[];
  ids: number[];
  dates: moment.Moment[];
  groupedDates: any;
  measurementById: CameraMeasurement[]; // measurements retrieved from server grouped by camera id
}

/**
 * Maintains user inputs (ngModel)
 */
export interface InputsModel {
  liveText: string;
  timeToLiveRefresh: number;
  isLive: boolean;
  liveInterval: any;
  selectedTimes: moment.Moment[];
  selectedStartTime: string;
  selectedEndTime: string;
  selectedFloor: number;
  selectedDate: moment.Moment;
  selectedSliderValue: number;
  selectedSpeed: number;
  // timelineState: string;
  timelineInterval: number;
  selectedDistance: number;
}

export interface Link {
  type: string;
  rel: string;
  title: string;
  href: string;
}

export interface SpatialExtent {
  bbox: number[];
  crs: string;
}

export interface Extent {
  spatial: SpatialExtent;
}

export interface Collection {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  links: Link[];
  extent: object[];
  itemType: string;
}

export interface Queryable {
  type: string;
  title: string;
  properties: {
    [id: string]: {title: string; type: string} | {$ref: string}
  };
  $schema: string;
  $id: string;
}

export interface CollectionMetadata {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  links: Link[];
  extent: Extent;
  itemType: string;
}
