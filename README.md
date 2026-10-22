# LivingScore AI

**Location Intelligence for Smarter Housing Decisions**

LivingScore AI is a full-stack web application that helps users evaluate residential locations using real-world environmental and neighborhood data.

By combining air quality measurements with nearby amenities, the application generates a location-based livability score to support more informed housing decisions.

Rather than relying solely on maps or subjective impressions, LivingScore AI transforms geographic data into a structured, easy-to-understand analysis.

---

## Features

### Location Analysis
- Convert user-entered addresses into geographic coordinates.
- Analyze locations through a web-based interface.
- Retrieve location-specific environmental and neighborhood data.

### Air Quality Analysis
- Fetch air pollution data using the OpenWeather Air Pollution API.
- Analyze the Air Quality Index (AQI).
- Calculate an air quality score based on the AQI category.

### Nearby Amenities
- Discover nearby places using the Geoapify Places API.
- Identify amenities including:
  - Supermarkets
  - Hospitals
  - Schools
  - Parks
  - Cafes
  - Bus stops
- Calculate distances between the selected location and nearby amenities.
- Generate an amenity score based on the current scoring algorithm.

### LivingScore Calculation
- Combine environmental and neighborhood scores into a single result.
- Display separate scores for air quality and nearby amenities.
- Generate a rule-based summary of the analyzed location.
- Handle unavailable external API data without incorrectly treating missing information as a zero score.

---

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | Node.js, Express.js |
| HTTP Client | Axios |
| Geocoding | OpenStreetMap Nominatim API |
| Air Quality | OpenWeather Air Pollution API |
| Nearby Places | Geoapify Places API |
| Version Control | Git, GitHub |

---

## Project Architecture

The project follows a frontend–backend architecture with separate services for external data retrieval and scoring.

```text
livingscore-ai/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/
│   │   │   ├── geocodeService.js
│   │   │   ├── airQualityService.js
│   │   │   ├── placesService.js
│   │   │   ├── scoreService.js
│   │   │   └── summaryService.js
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── globals.css
│   └── package.json
│
└── README.md
```

---

## How It Works

1. **Address Input:** The user enters a location through the frontend.
2. **Geocoding:** The backend converts the address into latitude and longitude.
3. **Air Quality Retrieval:** OpenWeather provides air pollution measurements.
4. **Nearby Places Retrieval:** Geoapify identifies amenities within the configured search radius.
5. **Scoring:** The backend calculates air quality and amenity scores.
6. **Results:** The frontend displays the calculated LivingScore and a location summary.

### Current Scoring System

| Component | Maximum Score |
|---|---:|
| Air Quality | 25 |
| Nearby Amenities | 25 |
| **Total LivingScore** | **50** |

The current scoring system is rule-based. Air quality is evaluated using AQI categories, while nearby amenities are evaluated using a weighted scoring approach.

**Important:** LivingScore is a prototype indicator, not a scientifically validated livability index. The current algorithm may assign identical scores to different urban areas, particularly when amenity scores reach their maximum.

The analysis represents the area surrounding the geocoded location rather than an entire district.

---

## Getting Started

### Prerequisites

- Node.js and npm
- OpenWeather API key
- Geoapify API key

### 1. Clone the Repository

```bash
git clone https://github.com/dilaracakmakk/livingscore-ai.git
cd livingscore-ai
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory and configure the required API keys.

```dotenv
OPENWEATHER_API_KEY=your_openweather_api_key
GEOAPIFY_API_KEY=your_geoapify_api_key
```

The OpenWeather variable name should match the one used in your local `airQualityService.js` implementation.

Start the backend:

```bash
npm run dev
```

The backend runs at:

`http://localhost:5000`

### 3. Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the application at:

`http://localhost:3000`

Both the frontend and backend must be running for location analysis to work.

---

## API Endpoint

### Analyze a Location

**POST** `/api/analyze`

Example request:

```json
{
  "address": "Bursa Osmangazi"
}
```

The API returns location information, air quality measurements, nearby amenities, data availability indicators, calculated scores, and a rule-based summary.

---

## Development Status

### Implemented

- [x] Node.js and Express backend
- [x] Next.js frontend
- [x] Address geocoding
- [x] OpenWeather air quality integration
- [x] Geoapify nearby places integration
- [x] Distance calculation for nearby amenities
- [x] Air quality scoring
- [x] Amenity scoring
- [x] Overall LivingScore calculation
- [x] Rule-based location summaries
- [x] Basic handling of unavailable API data

### Planned Improvements

- [ ] Improve scoring sensitivity and differentiation between locations
- [ ] Introduce category-specific amenity scoring
- [ ] Display nearby amenities with names and distances in the frontend
- [ ] Add interactive maps and location markers
- [ ] Improve frontend responsiveness and data visualization
- [ ] Add PostgreSQL for storing analysis results
- [ ] Explore AI-generated neighborhood insights
- [ ] Add historical analysis and location comparisons

---

## Project Goal

LivingScore AI aims to make location evaluation more accessible and data-driven.

The long-term vision is to develop a location intelligence platform that helps people compare residential areas using environmental conditions, accessibility to essential services, and other measurable neighborhood characteristics.

---

*LivingScore AI is an independently developed portfolio project and is currently under active development.*
