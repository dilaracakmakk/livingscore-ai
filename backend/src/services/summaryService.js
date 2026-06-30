const generateSummary = (scores) => {
    const { total, airQuality, amenities } = scores;

    let level= "";
    let message="";

    if (total >=40) {
        level = "Excellent";
        message = "This location offers excellent living conditions with strong environmental quality and access to amenities.";
    } else if (total >= 30) {
    level = "Good";
    message =
      "This location has good air quality and strong access to daily amenities.";
  } else if (total >= 20) {
    level = "Average";
    message =
      "This location provides average living conditions and may have limited nearby amenities.";
  } else {
    level = "Poor";
    message =
      "This location may not provide sufficient environmental quality or neighborhood accessibility.";
  }

  return {
    level,
    message,
    details: {
      airQuality,
      amenities,
      total
    }
  };
};

module.exports = {
  generateSummary
};
    
