const mongoose = require("mongoose");

const questionBankSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("QuestionBank", questionBankSchema);
