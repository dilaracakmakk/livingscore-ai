const express = require("express");
const router = express.Router();

const {
  analyzeLocation,
} = require("../controllers/analysisController");

router.post("/", analyzeLocation);

module.exports = router;