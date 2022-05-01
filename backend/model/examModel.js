const mongoose = require("mongoose");

const examSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    instructions: { type: String, required: true },
    timeLimit: { type: Number, required: true },
    dateAndTimeStart: { type: String, required: true },
    dateAndTimeEnd: { type: String, required: true },
    code: { type: String, required: true },
    questions: [],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exam", examSchema);
