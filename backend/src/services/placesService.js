const axios = require("axios");
const { calculateDistance } = require("../utils/distance");

const getNearbyPlaces = async (lat, lon) => {
  console.log("GEOAPIFY SERVICE CALLED");
  const radius = 1000;

  const apiKey = process.env.GEOAPIFY_API_KEY;

  if (!apiKey) {
    console.error("GEOAPIFY_API_KEY is missing");

    return {
      places: [],
      available: false,
    };
  }

  try {
    const response = await axios.get(
      "https://api.geoapify.com/v2/places",
      {
        params: {
          categories: [
            "catering.cafe",
            "commercial.supermarket",
            "healthcare.hospital",
            "education.school",
            "leisure.park",
            "public_transport.bus",
          ].join(","),

          filter: `circle:${lon},${lat},${radius}`,
          bias: `proximity:${lon},${lat}`,
          limit: 100,
          apiKey: apiKey,
        },

        timeout: 20000,
      }
    );

    if (!Array.isArray(response.data?.features)) {
      throw new Error("Invalid Geoapify response");
    }

    const places = response.data.features
      .filter((feature) => {
        const coordinates = feature.geometry?.coordinates;

        return (
          Array.isArray(coordinates) &&
          coordinates.length >= 2 &&
          Number.isFinite(coordinates[0]) &&
          Number.isFinite(coordinates[1])
        );
      })
      .map((feature) => {
        const placeLon = feature.geometry.coordinates[0];
        const placeLat = feature.geometry.coordinates[1];

        const categories = feature.properties?.categories || [];

        let type = "unknown";

        if (categories.some((c) => c.startsWith("catering.cafe"))) {
          type = "cafe";
        } else if (
          categories.some((c) => c.startsWith("commercial.supermarket"))
        ) {
          type = "supermarket";
        } else if (
          categories.some((c) => c.startsWith("healthcare.hospital"))
        ) {
          type = "hospital";
        } else if (
          categories.some((c) => c.startsWith("education.school"))
        ) {
          type = "school";
        } else if (
          categories.some((c) => c.startsWith("leisure.park"))
        ) {
          type = "park";
        } else if (
          categories.some((c) => c.startsWith("public_transport.bus"))
        ) {
          type = "bus_stop";
        }

        const distanceKm = calculateDistance(
          lat,
          lon,
          placeLat,
          placeLon
        );

        return {
          id: feature.properties?.place_id || feature.id,
          name: feature.properties?.name || "Unnamed place",
          type,
          lat: placeLat,
          lon: placeLon,
          distanceKm: Number(distanceKm.toFixed(2)),
        };
      });

    console.log(`Geoapify: ${places.length} places found`);

    return {
      places,
      available: true,
    };
  } catch (error) {
    console.error(
      "Geoapify error:",
      error.response?.status || error.message
    );

    return {
      places: [],
      available: false,
    };
  }
};

module.exports = { getNearbyPlaces };