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
const getDistanceMultiplier = (distanceKm) => {
  if (distanceKm <= 0.2) {
    return 1;
  }

  if (distanceKm <= 0.5) {
    return 0.75;
  }

  if (distanceKm <= 1) {
    return 0.5;
  }

  return 0.25;
};

const calculateAmenityScore = (places) => {
  const baseScores = {
    hospital: 3,
    school: 2,
    park: 2,
    supermarket: 2,
    bus_stop: 3,
    cafe: 1,
  };

  let score = 0;

  places.forEach((place) => {
    const baseScore = baseScores[place.type];

    if (!baseScore) {
      return;
    }

    const distanceMultiplier = getDistanceMultiplier(
      place.distanceKm
    );

    score += baseScore * distanceMultiplier;
  });

  return Math.min(Number(score.toFixed(2)), 25);
};
module.exports = {
  calculateAirQualityScore,
  calculateAmenityScore
};