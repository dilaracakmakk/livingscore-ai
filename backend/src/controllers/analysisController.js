const { geocodeAddress } = require("../services/geocodeService");
const { getAirQuality } = require("../services/airQualityService");
const { getNearbyPlaces } = require("../services/placesService");

const {
  calculateAirQualityScore,
  calculateAmenityScore,
} = require("../services/scoreService");

const { generateSummary } = require("../services/summaryService");

const analyzeLocation = async (req, res) => {
  try {
    const { address } = req.body || {};

    if (typeof address !== "string" || !address.trim()) {
      return res.status(400).json({
        success: false,
        message: "A valid address is required",
      });
    }

    // 1. Adresin koordinatlarını bul
    const coordinates = await geocodeAddress(address);

    // 2. Hava kalitesi verilerini al
    const airQuality = await getAirQuality(
      coordinates.lat,
      coordinates.lon
    );

    // 3. Yakındaki mekanları sorgula
    const nearbyPlacesResult = await getNearbyPlaces(
      coordinates.lat,
      coordinates.lon
    );

    const nearbyPlaces = nearbyPlacesResult.places;
    const placesAvailable = nearbyPlacesResult.available;

    // 4. Puanları hesapla
    const airQualityScore = calculateAirQualityScore(
      airQuality.aqi
    );

    const amenityScore = placesAvailable
      ? calculateAmenityScore(nearbyPlaces)
      : null;

    const totalScore =
      amenityScore === null
        ? null
        : airQualityScore + amenityScore;

    const scores = {
      airQuality: airQualityScore,
      amenities: amenityScore,
      total: totalScore,
    };

    // 5. Analiz özetini oluştur
    const summary = placesAvailable
      ? generateSummary(scores)
      : {
          level: "Partial analysis",
          message:
            "Air quality was analyzed, but nearby amenities data is currently unavailable.",
          details: scores,
        };

    // 6. Sonucu gönder
    return res.json({
      success: true,
      address,
      coordinates,
      airQuality,
      nearbyPlaces,
      dataAvailability: {
        nearbyPlaces: placesAvailable,
      },
      scores,
      summary,
    });
  } catch (error) {
    console.error("Analysis error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Analysis failed",
      error: error.message,
    });
  }
};

module.exports = { analyzeLocation };