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