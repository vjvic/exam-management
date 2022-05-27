const express = require("express");
const router = express.Router();
const {
  updateSettings,
  getSettings,
} = require("../controllers/settingsController.js");

router.put("/:id", updateSettings);
router.get("/", getSettings);

module.exports = router;
