const calculateAirQualityScore = (aqi) => {
  switch (aqi) {
    case 1:
      return 25; // Çok iyi
    case 2:
      return 20; // İyi
    case 3:
      return 15; // Orta
    case 4:
      return 8; // Kötü
    case 5:
      return 3; // Çok kötü
    default:
      return 0;
  }
};

module.exports = {
  calculateAirQualityScore
};

const calculateAmenityScore = (places) => {
  let score = 0;

  places.forEach((place) => {
    switch (place.type) {
      case "hospital":
        score += 3;
        break;

      case "school":
        score += 2;
        break;

      case "park":
        score += 2;
        break;

      case "supermarket":
        score += 2;
        break;

      case "bus_stop":
        score += 3;
        break;

      case "cafe":
        score += 1;
        break;

      default:
        break;
    }
  });

  return Math.min(score, 25);
};
module.exports = {
  calculateAirQualityScore,
  calculateAmenityScore
};