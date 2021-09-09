"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const stationAnalytics = require("../utils/station-analytics");
const uuid = require("uuid");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    let latestReading = null;
    let fahrenheit = null;
    let beaufort = null;
    let compassDirection = null;
    let windChillTemp = null;
    let codeToText = null;
    let codeToSymbol = null;
    let minTemperature = null;
    let maxTemperature = null;
    let minWindSpeed = null;
    let maxWindSpeed = null;
    let minPressure = null;
    let maxPressure = null;
    logger.debug("Station id = ", stationId);

    
    const station = stationStore.getStation(stationId);
    if (station.readings.length > 0) {
    latestReading = station.readings[station.readings.length-1];
    fahrenheit = stationAnalytics.fahrenheit(Number(latestReading.temperature));
    beaufort = stationAnalytics.beaufort(Number(latestReading.windSpeed));
    compassDirection = stationAnalytics.compassDirection(Number(latestReading.windDirection));
    windChillTemp = stationAnalytics.windChillTemp(latestReading.temperature, latestReading.windSpeed);
    codeToText = stationAnalytics.codeToText(Number(latestReading.weatherCode));
    codeToSymbol = stationAnalytics.codeToSymbol (Number(latestReading.weatherCode));
    minTemperature = stationAnalytics.getMinTemperature(station);
    maxTemperature = stationAnalytics.getMaxTemperature(station);
    minWindSpeed = stationAnalytics.getMinWindSpeed(station);
    maxWindSpeed= stationAnalytics.getMaxWindSpeed(station);
    minPressure = stationAnalytics.getMinPressure(station);
    maxPressure= stationAnalytics.getMaxPressure(station);
     
     }
    
    
    

    const viewData = {
      name: "Station",
      station: stationStore.getStation(stationId),
      latestReading: latestReading,
      fahrenheit : fahrenheit,
      beaufort : beaufort,
      compassDirection:compassDirection,
      windChillTemp:windChillTemp,
      codeToText:codeToText,
      codeToSymbol:codeToSymbol,
      minTemperature : minTemperature,
      maxTemperature : maxTemperature,
      minWindSpeed:minWindSpeed,
      maxWindSpeed:maxWindSpeed,
      minPressure:minPressure,
      maxPressure:maxPressure,
       
    };
    response.render("station", viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      id: uuid.v1(),
      weatherCode:request.body.weatherCode,
      temperature:request.body.temperature,
      windDirection:request.body.windDirection,
      windSpeed:request.body.windSpeed,
      pressure:request.body.pressure
    };
    logger.debug("New Reading = ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  }
};

module.exports = station;
