const mongoose = require("mongoose");

const settingsSchema = mongoose.Schema(
  {
    text: String,
    color: String,
    image: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Settings", settingsSchema);
