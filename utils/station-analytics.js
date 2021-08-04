"use strict";

const stationAnalytics = {
  getShortestReading(station) {
    let shortestReading = null;
    if (station.readings.length > 0) {
      shortestReading = station.readings[0];
      for (let i = 1; i < station.readings.length; i++) {
        shortestReading = station.readings[i];
      }
    }
    return shortestReading;
  }
};

module.exports = stationAnalytics;

