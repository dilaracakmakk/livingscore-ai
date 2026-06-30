const axios = require("axios");

const getNearbyPlaces = async (lat, lon) => {
  const radius = 500;

  const query = `
    [out:json][timeout:25];
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

  const response = await axios.get("https://overpass-api.de/api/interpreter", {
    params: {
      data: query
    },
    headers: {
      "User-Agent": "LivingScoreAI/1.0"
    }
  });

  return response.data.elements.map((place) => ({
    id: place.id,
    name: place.tags?.name || "Unnamed place",
    type:
      place.tags?.amenity ||
      place.tags?.shop ||
      place.tags?.leisure ||
      place.tags?.highway ||
      "unknown",
    lat: place.lat,
    lon: place.lon
  }));
};

module.exports = { getNearbyPlaces };