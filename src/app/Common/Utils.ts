import {LatLng} from 'leaflet';
import * as _ from 'lodash';
import {CameraInfo, CameraMeasurement, CameraSearch, InputsModel} from './Model';
import * as moment from 'moment';

export class Utils {

  static heatmapPreferredRadius = {
    9: 0.05,
    10: 0.03,
    11: 0.01,
    12: 0.005,
    13: 0.003,
    14: 0.001,
    15: 0.0007,
    16: 0.0005,
    17: 0.0003,
    18: 0.0002,
    19: 0.0001,
  };

  static closePolygon(latlngs: LatLng[] | LatLng[][] | LatLng[][][]): LatLng[] | LatLng[][] | LatLng[][][] {
    let level = latlngs;
    let previousLevel;


    while (_.isArray (level)) {
      previousLevel = level;
      // @ts-ignore
      level = _.head(level);
    }

    if (previousLevel) {
      previousLevel.push(_.head(previousLevel));
      return previousLevel;
    }

    return level;
  }

  static latLngToMongoCoordinates(latLngs: LatLng[] | LatLng[][] | LatLng[][][]): number[] {
    let level = latLngs;
    let previousLevel;

    while (_.isArray(level)) {
      previousLevel = level;
      // @ts-ignore
      level = _.head(level);
    }

    // @ts-ignore
    return _.map(previousLevel, (obj) => {
      return [obj.lng, obj.lat];
    });
  }

  private static  cameraInfoToGeoJSONFeature(cameraInfo: CameraInfo): object {
    const feature = {
      type: 'Feature',
      properties: {},
      geometry: cameraInfo.position
    };

    const properties = {};

    for (const key of _.keys(cameraInfo)) {
      const value = _.get(cameraInfo, key);
      if (key !== '_id' && key !== 'position') {
        _.set(properties, key, value);
      }
    }

    _.set(feature, 'properties', properties);
    return feature;
  }

  static cameraInfoToGeoJSONFeatures(cameraInfo: CameraInfo | CameraInfo[]): object[] {
    const toReturn = [];

    if (_.isArray(cameraInfo)) {
      for (const camera of (cameraInfo as CameraInfo[])) {
        toReturn.push(this.cameraInfoToGeoJSONFeature(camera));
      }
    } else {
      toReturn.push(this.cameraInfoToGeoJSONFeature((cameraInfo as CameraInfo)));
    }

    return toReturn;
  }

  static measurementsToGeoJsonFeatures(measurements: CameraMeasurement | CameraMeasurement[]): object[] {
    const toReturn = [];

    if (!_.isArray(measurements)) {
      measurements = [measurements];
    }

    for (const measurement of measurements) {
      const properties = {};
      for (const key of _.keys(measurement)) {
        if (key !== 'measurements' && key !== 'position') {
          _.set(properties, key, _.get(measurement, key));
        }
      }

      toReturn.push({
        type: 'Feature',
        // properties: {
        //   persons: measurement.persons,
        //   name: measurement.name,
        //   id: measurement.id,
        // },
        properties,
        geometry: measurement.position
      });
    }

    return toReturn;
  }

  static isMomentDateInList(momentDate: moment.Moment | null, momentList: string[]): boolean {
    if (!momentDate) {
      return false;
    }

    const dateString = momentDate.format('DD-MM-YYYY');

    for (const date of momentList) {
      if (dateString === date) {
        return true;
      }
    }

    return false;
  }

  static getPreferredHeatmapRadius(zoom: number): number {
    return this.heatmapPreferredRadius[zoom];
  }

  static getDefaultSearchModel(): CameraSearch {
    return  {
      dates: [],
      ids: [],
      groupedDates: [],
      measurementById: [],
      timelineDates: [],
    };
  }

  static getDefaultInputsModel(): InputsModel {
    return  {
      selectedTimes: [],
      selectedFloor: undefined,
      selectedStartTime: '',
      selectedEndTime: '',
      selectedDate: undefined,
      selectedSliderValue: 0,
      // timelineState: 'paused',
      liveInterval: undefined,
      timelineInterval: undefined,
      selectedSpeed: 1,
      selectedDistance: undefined,
      isLive: false,
      liveText: '',
      timeToLiveRefresh: 30,
    };
  }
}
