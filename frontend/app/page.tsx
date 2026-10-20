"use client";

import { useState } from "react";

type AnalysisResult = {
  success: boolean;
  address: string;
  airQuality: {
    aqi: number;
    pm2_5: number;
    pm10: number;
  };
  scores: {
    airQuality: number;
    amenities: number | null;
    total: number | null;
  };
  dataAvailability?: {
    nearbyPlaces: boolean;
  };
  summary: {
    level: string;
    message: string;
  };
};

export default function Home() {
  const [address, setAddress] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyzeLocation = async () => {
    if (!address.trim()) {
      setError("Please enter an address.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        "http://localhost:5000/api/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Analysis failed.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            LivingScore <span className="text-emerald-400">AI</span>
          </h1>

          <p className="mt-4 text-slate-400">
            Discover the livability of any location.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <h2 className="mb-4 text-xl font-semibold">
            Analyze a Location
          </h2>

          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !loading) {
                  analyzeLocation();
                }
              }}
              placeholder="e.g. Bursa Osmangazi"
              className="flex-1 rounded-lg border border-slate-700 bg-slate-800 px-4 py-3 text-white outline-none focus:border-emerald-400"
            />

            <button
              onClick={analyzeLocation}
              disabled={loading}
              className="rounded-lg bg-emerald-500 px-6 py-3 font-semibold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
            >
              {loading ? "Analyzing..." : "Analyze Location"}
            </button>
          </div>

          {error && (
            <p className="mt-4 text-red-400">{error}</p>
          )}
        </div>

        {result && (
          <div className="mt-8 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Location
              </p>
              <h2 className="mt-1 text-2xl font-semibold">
                {result.address}
              </h2>

              <p className="mt-5 text-sm text-slate-400">
                Living Score
              </p>

              <p className="mt-2 text-5xl font-bold text-emerald-400">
                {result.scores.total === null
                  ? "Unavailable"
                  : `${result.scores.total} / 50`}
              </p>

              <p className="mt-4 text-lg font-medium">
                {result.summary.level}
              </p>
              <p className="mt-2 text-slate-400">
                {result.summary.message}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h3 className="text-lg font-semibold">
                  Air Quality
                </h3>
                <p className="mt-3 text-3xl font-bold text-emerald-400">
                  {result.scores.airQuality} / 25
                </p>
                <p className="mt-3 text-sm text-slate-400">
                  AQI: {result.airQuality.aqi}
                </p>
                <p className="text-sm text-slate-400">
                  PM2.5: {result.airQuality.pm2_5}
                </p>
                <p className="text-sm text-slate-400">
                  PM10: {result.airQuality.pm10}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                <h3 className="text-lg font-semibold">
                  Nearby Amenities
                </h3>

                <p className="mt-3 text-3xl font-bold text-emerald-400">
                  {result.scores.amenities === null
                    ? "Unavailable"
                    : `${result.scores.amenities} / 25`}
                </p>

                <p className="mt-3 text-sm text-slate-400">
                  {result.dataAvailability?.nearbyPlaces === false
                    ? "Nearby places data is temporarily unavailable."
                    : "Score based on nearby places and distance."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}