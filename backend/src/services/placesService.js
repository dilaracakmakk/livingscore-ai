const axios = require("axios");
const { calculateDistance } = require("../utils/distance");

const OVERPASS_ENDPOINTS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];

const requestOverpass = async (query) => {
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      const response = await axios.post(
        endpoint,
        new URLSearchParams({ data: query }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "LivingScoreAI/1.0",
          },
          timeout: 15000,
        }
      );

      if (!Array.isArray(response.data?.elements)) {
        throw new Error("Invalid Overpass response");
      }

      return response.data;
    } catch (error) {
      console.warn(
        `Overpass failed: ${endpoint} - ${error.message}`
      );
    }
  }

  return null;
};

const getNearbyPlaces = async (lat, lon) => {
  const radius = 300;

  const query = `
    [out:json][timeout:10];
    (
      node["amenity"="cafe"](around:${radius},${lat},${lon});
      node["shop"="supermarket"](around:${radius},${lat},${lon});
      node["amenity"="hospital"](around:${radius},${lat},${lon});
      node["amenity"="school"](around:${radius},${lat},${lon});
      node["leisure"="park"](around:${radius},${lat},${lon});
      node["highway"="bus_stop"](around:${radius},${lat},${lon});
    );
    out body;
  `;

  const data = await requestOverpass(query);

  if (data === null) {
    return {
      places: [],
      available: false,
    };
  }

  const places = data.elements
    .filter(
      (place) =>
        typeof place.lat === "number" &&
        typeof place.lon === "number"
    )
    .map((place) => {
      const distanceKm = calculateDistance(
        lat,
        lon,
        place.lat,
        place.lon
      );

      return {
        id: place.id,
        name: place.tags?.name || "Unnamed place",
        type:
          place.tags?.amenity ||
          place.tags?.shop ||
          place.tags?.leisure ||
          place.tags?.highway ||
          "unknown",
        lat: place.lat,
        lon: place.lon,
        distanceKm: Number(distanceKm.toFixed(2)),
      };
    });

  return {
    places,
    available: true,
  };
};

module.exports = { getNearbyPlaces };