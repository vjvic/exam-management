const AsyncHandler = require("express-async-handler");
const QuestionBank = require("../model/questionBankModel");
const Question = require("../model/questionModel");

// @desc    create question bank
// @route   POST /api/questionbank
// @access  Private
const createQuestionBank = AsyncHandler(async (req, res) => {
  const questionBank = await QuestionBank.create(req.body);

  res.status(200).json(questionBank);
});

// @desc    get all questionbank
// @route   GET /api/questionbank
// @access  Private
const getAllQuestionBank = AsyncHandler(async (req, res) => {
  /*  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {}; */

  const questionBank = await QuestionBank.aggregate([
    { $sort: { createdAt: -1 } },
  ]);

  res.status(200).json(questionBank);
});

// @desc    get questionbank by id
// @route   GET /api/questionbank/:id
// @access  Private
const getQuestionBankById = AsyncHandler(async (req, res) => {
  const questionBank = await QuestionBank.findById(req.params.id);

  if (!questionBank) {
    res.status(404);
    throw new Error("Question not found");
  }

  res.status(200).json(questionBank);
});

// @desc    Delete questionbank
// @route   DELETE /api/questionbank/:id
// @access  Private
const deleteQuestionBank = AsyncHandler(async (req, res) => {
  const questionBank = await QuestionBank.findById(req.params.id);

  if (!questionBank) {
    res.status(404);
    throw new Error("Question not found");
  }

  await questionBank.deleteOne(questionBank);

  res.status(200).json({ id: questionBank._id });
});

// @desc    update questionbank
// @route   PUT /api/questionbank/:id
// @access  Private
const updateQuestionBank = AsyncHandler(async (req, res) => {
  const questionBank = await QuestionBank.findById(req.params.id);

  if (!questionBank) {
    res.status(404);
    throw new Error("Question not found");
  }

  const updatedQuestion = await QuestionBank.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedQuestion);
});

module.exports = {
  createQuestionBank,
  getAllQuestionBank,
  getQuestionBankById,
  deleteQuestionBank,
  updateQuestionBank,
};
