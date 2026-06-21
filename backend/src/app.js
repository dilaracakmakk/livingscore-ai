const express = require("express");
const cors = require("cors");

require("dotenv").config();

const analysisRoutes = require("./routes/analysisRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("LivingScore AI Backend is running");
});

app.use("/api/analyze", analysisRoutes);

module.exports = app;