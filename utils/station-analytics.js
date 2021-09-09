"use strict";

const stationList = require('../models/station-store.js');

const stationAnalytics = {
   
    getLatestReading(stationId) {
    let latestReading = null;
    const station = stationList.getStation(stationId)
    if (station.readings.length > 0) {
      latestReading = station.readings[station.readings.length-1];  
    }
    return latestReading;
  
  },
  
 
  getMinWindSpeed(station) {
   let minWindSpeed = station.readings[0].windSpeed;
  for (let i = 0; i < station.readings.length; i++ ) {
    if (station.readings[i].windSpeed < minWindSpeed){
      minWindSpeed = station.readings[i].windSpeed;
    }
  }
  return minWindSpeed;
},
  
   getMaxWindSpeed(station) {
   let maxWindSpeed = station.readings[0].windSpeed
  for (let i = 0; i < station.readings.length; i++ ) {
    if (station.readings[i].windSpeed > maxWindSpeed){
      maxWindSpeed = station.readings[i].windSpeed;
    }
  }
  return maxWindSpeed;
},
  
  getMinPressure(station) {
  let minPressure = station.readings[0].pressure;
  for (let i = 0; i < station.readings.length; i++ ) {
    if (station.readings[i].pressure < minPressure){
      minPressure = station.readings[i].pressure;
    }
  }
  return minPressure;
},
  
  getMaxPressure(station){
  let maxPressure = station.readings[0].pressure
  for (let i = 0; i < station.readings.length; i++ ) {
    if (station.readings[i].pressure > maxPressure){
      maxPressure = station.readings[i].pressure;
    }
  }
  return maxPressure;
},
  

getMinTemperature(station){
  let minTemperature = station.readings[0].temperature;
  for (let i = 0; i < station.readings.length; i++ ) {
    if (station.readings[i].temperature < minTemperature){
      minTemperature = station.readings[i].temperature;
    }
  }
  return minTemperature;
},
    
 getMaxTemperature(station){
  let maxTemperature = station.readings[0].temperature;
  for (let i = 0; i < station.readings.length; i++ ) {
    if (station.readings[i].temperature > maxTemperature){
      maxTemperature = station.readings[i].temperature;
    }
  }
  return maxTemperature;
},

    
    fahrenheit(temperature) {
    let fahrenheit;
    fahrenheit = (temperature * 9 / 5) + 32;
    return fahrenheit;
  },
  
  beaufort(windSpeed) {
  let beaufort;
   if (windSpeed <= 1) {
      beaufort = 0;
    } else if (windSpeed > 1 && windSpeed <= 5) {
      beaufort = 1;
    } else if (windSpeed > 5 && windSpeed <= 11) {
      beaufort = 2;
    } else if (windSpeed > 11 && windSpeed <= 19) {
      beaufort = 3;
    } else if (windSpeed > 19 && windSpeed <= 28) {
      beaufort = 4;
    } else if (windSpeed > 28 && windSpeed <= 38) {
      beaufort = 5;
    } else if (windSpeed > 38 && windSpeed <= 49) {
      beaufort = 6;
    } else if (windSpeed > 49 && windSpeed <= 61) {
      beaufort = 7;
    } else if (windSpeed > 61 && windSpeed <= 74) {
      beaufort = 8;
    } else if (windSpeed > 74 && windSpeed <= 88) {
      beaufort = 9;
    } else if (windSpeed > 88 && windSpeed <= 102) {
      beaufort = 10;
    } else if (windSpeed > 102 && windSpeed <= 117) {
      beaufort = 11;
    }
    return beaufort;
  },
  
   compassDirection(windDirection) {
     let compassDirection
    if ((windDirection >= 348.75) && (windDirection <= 360) ||
        (windDirection >= 0) && (windDirection <= 11.25)) {
      return "North";
    } else if ((windDirection >= 11.25) && (windDirection <= 33.75)) {
      return "North North East";
    } else if ((windDirection >= 33.75) && (windDirection <= 56.25)) {
      return "North East";
    } else if ((windDirection >= 56.25) && (windDirection <= 78.75)) {
      return "East North East";
    } else if ((windDirection >= 78.75) && (windDirection <= 101.25)) {
      return "East";
    } else if ((windDirection >= 101.25) && (windDirection <= 123.75)) {
      return "East South East";
    } else if ((windDirection >= 123.75) && (windDirection <= 146.25)) {
      return "South East";
    } else if ((windDirection >= 146.25) && (windDirection <= 168.75)) {
      return "South South East";
    } else if ((windDirection >= 168.75) && (windDirection <= 191.25)) {
      return "South";
    } else if ((windDirection >= 191.25) && (windDirection <= 213.75)) {
      return "South South West";
    } else if ((windDirection >= 213.75) && (windDirection <= 236.25)) {
      return "South W";
    } else if ((windDirection >= 236.25) && (windDirection <= 258.75)) {
      return "West South West";
    } else if ((windDirection >= 258.75) && (windDirection <= 281.25)) {
      return "West";
    } else if ((windDirection >= 281.25) && (windDirection <= 303.75)) {
      return "West North West";
    } else if ((windDirection >= 303.75) && (windDirection <= 326.25)) {
      return "North West";
    } else if ((windDirection >= 326.25) && (windDirection <= 348.75)) {
      return "North North West";
    } else if (windDirection > 360) {
      return "CRAP DATA";
        }
    return compassDirection;
  },
  
  windChillTemp(temperature, windSpeed) {
  let windChillTemp;
  windChillTemp = (13.12 + (0.6215 * temperature) - (11.37 * Math.pow(windSpeed, 0.16)) + (0.3965 * temperature * Math.pow(windSpeed, 0.16)));
   return Math.round(windChillTemp);
  },
   
  codeToText(weatherCode) {
    switch (weatherCode) {
      case 100:
        return "Clear";
      case 200:
        return "Partial Clouds";
      case 300:
        return "Cloudy";
      case 400:
        return "Light Showers";
      case 500:
        return "Heavy Showers";
      case 600:
        return "Rain";
      case 700:
        return "Snow";
      case 800:
        return "Thunder";
      default:
        return "Crap Data";
    }
  },
  
    codeToSymbol(weatherCode) {
    switch (weatherCode) {
      case 100:
        return "white huge sun outline icon";
      case 200:
        return "white huge cloud sun icon";
      case 300:
        return "white huge cloud icon";
      case 400:
        return "white huge cloud rain icon";
      case 500:
        return "white huge cloud showers heavy icon";
      case 600:
        return "white huge umbrella icon";
      case 700:
        return "white huge snowflake icon";
      case 800:
        return "white huge bolt icon";
      default:
        return "white huge skull crossbones icon";
    }
  },
};

module.exports = stationAnalytics;

