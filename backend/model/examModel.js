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
    questionBank: String,
  },
  {
    timestamps: true,
  }
);

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
    questions: [questionSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Exam", examSchema);
