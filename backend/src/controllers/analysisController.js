const { geocodeAddress } = require("../services/geocodeService");
const { getAirQuality } = require("../services/airQualityService");
const { getNearbyPlaces } = require("../services/placesService");
const { generateSummary } = require("../services/summaryService");
const {
  calculateAirQualityScore,
  calculateAmenityScore,
} = require("../services/scoreService");

const analyzeAddress = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required",
      });
    }

    const coordinates = await geocodeAddress(address);

    const airQuality = await getAirQuality(
      coordinates.lat,
      coordinates.lon
    );

    const airQualityScore = calculateAirQualityScore(
      airQuality.aqi
    );

    const nearbyPlaces = await getNearbyPlaces(
      coordinates.lat,
      coordinates.lon
    );

    const amenityScore =
      calculateAmenityScore(nearbyPlaces);

    const totalScore =
      airQualityScore + amenityScore;
const summary = generateSummary({
  airQuality: airQualityScore,
  amenities: amenityScore,
  total: totalScore,
});
    return res.json({
      success: true,
      address,
      coordinates,
      airQuality,
      nearbyPlaces,
     scores: {
  airQuality: airQualityScore,
  amenities: amenityScore,
  total: totalScore,
},
summary
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Analysis failed",
      error: error.message,
    });
  }
};

module.exports = { analyzeAddress };