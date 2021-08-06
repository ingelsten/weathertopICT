"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const stationAnalytics = require("../utils/station-analytics");
const uuid = require("uuid");

const station = {
  index(request, response) {
    const stationId = request.params.id;
    logger.debug("Station id = ", stationId);

    const station = stationStore.getStation(stationId);
    const shortestReading = stationAnalytics.getShortestReading(station);
    console.log(shortestReading);
    const viewData = {
      name: "Station",
      station: stationStore.getStation(stationId),
      shortestReading: shortestReading
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
      title: request.body.title,
      artist: request.body.artist,
      weatherCode:request.body.weatherCode,
      temperature:request.body.temperature,
      windDirection:request.body.windDirection,
      windSpeed:request.body.windSpeed,
      pressure:request.body.pressure,
      duration: Number(request.body.duration)
    };
    logger.debug("New Reading = ", newReading);
    stationStore.addReading(stationId, newReading);
    response.redirect("/station/" + stationId);
  }
};

module.exports = station;
