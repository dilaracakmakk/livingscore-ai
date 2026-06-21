const axios = require("axios");

const getAirQuality = async (lat, lon) => {
  const apiKey = process.env.OPENWEATHER_API_KEY;

  if (!apiKey) {
    throw new Error("OpenWeather API key is missing");
  }

  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/air_pollution",
    {
      params: {
        lat,
        lon,
        appid: apiKey
      }
    }
  );

  const data = response.data.list[0];

  return {
    aqi: data.main.aqi,
    pm2_5: data.components.pm2_5,
    pm10: data.components.pm10,
    no2: data.components.no2,
    o3: data.components.o3
  };
};

module.exports = { getAirQuality };