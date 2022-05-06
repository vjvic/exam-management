const mongoose = require("mongoose");

const choicesSchema = mongoose.Schema(
  {
    text: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const questionSchema = mongoose.Schema(
  {
    questionText: { type: String, required: true },
    choices: [choicesSchema],
    answer: { type: String, required: true },
    point: { type: Number, required: true },
    cpd: { type: String, required: true },
    kd: { type: String, required: true },
    image: { type: String, default: "" },
    questionBank: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);
