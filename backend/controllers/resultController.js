const AsyncHandler = require("express-async-handler");
const Result = require("../model/resultModel");
/* fName: { type: String, required: true },
lName: { type: String, required: true },
score: { type: Number, required: true },
examTitle: { type: String, required: true },
questions: [questionSchema],
user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }, */

// @desc    create result
// @route   POST /api/result
// @access  Private
const createResult = AsyncHandler(async (req, res) => {
  const { fName, lName, score, examTitle, questions } = req.body;

  const result = await Result.create({
    fName,
    lName,
    score,
    examTitle,
    questions,
    user: req.user._id,
  });

  res.status(200).json(result);
});

// @desc    get all result
// @route   GET /api/result
// @access  Private
const getAllResult = AsyncHandler(async (req, res) => {
  const result = await Result.aggregate([{ $sort: { createdAt: -1 } }]);

  res.status(200).json(result);
});

// @desc    get all result
// @route   GET /api/result/myresult
// @access  Private
const getMyResult = AsyncHandler(async (req, res) => {
  const result = await Result.find({ user: req.user._id });

  res.status(200).json(result);
});

// @desc    get result by id
// @route   GET /api/result/:id
// @access  Private
const getResultById = AsyncHandler(async (req, res) => {
  const result = await Result.findById(req.params.id);

  if (!result) {
    res.status(404);
    throw new Error("Result not found");
  }

  res.status(200).json(result);
});

module.exports = {
  createResult,
  getAllResult,
  getResultById,
  getMyResult,
};
