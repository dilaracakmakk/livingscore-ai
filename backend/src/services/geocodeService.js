const axios = require("axios");

const geocodeAddress = async (address) => {
  const response = await axios.get("https://nominatim.openstreetmap.org/search", {
    params: {
      q: address,
      format: "json",
      limit: 1
    },
    headers: {
      "User-Agent": "LivingScoreAI/1.0"
    }
  });

  if (!response.data || response.data.length === 0) {
    throw new Error("Address not found");
  }

  return {
    lat: Number(response.data[0].lat),
    lon: Number(response.data[0].lon),
    displayName: response.data[0].display_name
  };
};

module.exports = { geocodeAddress };