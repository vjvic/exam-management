const mongoose = require("mongoose");

const dateTimeSchema = mongoose.Schema(
  {
    from: { type: Date, required: true },
    to: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

const examSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    timeLimit: { type: Number, required: true },
    dateAndTime: dateTimeSchema,
    code: { type: String, required: true },
    questions: [{ type: mongoose.Schema.ObjectId, ref: "Question" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exam", examSchema);
