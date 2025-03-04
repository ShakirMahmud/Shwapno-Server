const express = require("express");
const { getAnalyticsStats } = require("../controllers/statsController");

const router = express.Router();

router.get("/", getAnalyticsStats);

module.exports = router;