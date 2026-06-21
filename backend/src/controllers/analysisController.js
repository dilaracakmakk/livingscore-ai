const { geocodeAddress } = require("../services/geocodeService");
const { getAirQuality } = require("../services/airQualityService");
const { calculateAirQualityScore } = require("../services/scoreService");

const analyzeAddress = async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({
        success: false,
        message: "Address is required"
      });
    }

    const coordinates = await geocodeAddress(address);
    const airQuality = await getAirQuality(coordinates.lat, coordinates.lon);
const airQualityScore = calculateAirQualityScore(
  airQuality.aqi
);
   return res.json({
  success: true,
  address,
  coordinates,
  airQuality,
  scores: {
    airQuality: airQualityScore
  }
});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Analysis failed",
      error: error.message
    });
  }
};

module.exports = { analyzeAddress };