"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");

const reading = {
  index(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Editing Reading ${readingId} from Station ${stationId}`);
    const viewData = {
      title: "Edit Reading",
      station: stationStore.getStation(stationId),
      reading: stationStore.getReading(stationId, readingId)
    };
    response.render("reading", viewData);
  },

  update(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    const reading = stationStore.getReading(stationId, readingId)
    const newReading = {
      title: request.body.title,
      weatherCode:request.body.weatherCode,
      temperature:request.body.temperature,
      windDirection:request.body.windDirection,
      windSpeed:Number(request.body.windSpeed),
      pressure:request.body.pressure,
      duration: Number(request.body.duration)
       };
    logger.debug(`Updating Reading ${readingId} from Station ${stationId}`);
    stationStore.updateReading(reading, newReading);
    response.redirect("/station/" + stationId);
  }
};

module.exports = reading;
