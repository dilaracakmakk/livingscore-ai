const express = require("express");
const router = express.Router();

const { analyzeAddress } = require("../controllers/analysisController");

router.post("/", analyzeAddress);

module.exports = router;