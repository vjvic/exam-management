const AsyncHandler = require("express-async-handler");
const Settings = require("../model/settingsModel");

// @desc    update settings
// @route   PUT /api/settings/:id
// @access  Private
const updateSettings = AsyncHandler(async (req, res) => {
  const settings = await Settings.findById(req.params.id);

  if (!settings) {
    res.status(404);
    throw new Error("settings not found");
  }

  const updatedSettings = await Settings.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedSettings);
});

// @desc    get settings
// @route   GET /api/settings
// @access  Private
const getSettings = AsyncHandler(async (req, res) => {
  const settings = await Settings.find({});

  res.status(200).json(settings[0]);
});

module.exports = {
  updateSettings,
  getSettings,
};
