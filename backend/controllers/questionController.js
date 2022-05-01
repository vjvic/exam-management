const AsyncHandler = require("express-async-handler");
const Question = require("../model/questionModel");

// @desc    create question
// @route   POST /api/question
// @access  Private
const createQuestion = AsyncHandler(async (req, res) => {
  const question = await Question.create(req.body);

  res.status(200).json(question);
});

// @desc    get all question
// @route   GET /api/question
// @access  Private
const getAllQuestion = AsyncHandler(async (req, res) => {
  const question = await Question.find({});

  res.status(200).json(question);
});

// @desc    get question by id
// @route   GET /api/question/:id
// @access  Private
const getQuestionById = AsyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    res.status(400);
    throw new Error("Question not found");
  }

  res.status(200).json(question);
});

// @desc    Delete question
// @route   DELETE /api/question/:id
// @access  Private
const deleteQuestion = AsyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    res.status(400);
    throw new Error("Question not found");
  }

  await question.deleteOne(question);

  res.status(200).json({ message: "Delete success" });
});

// @desc    update question
// @route   PUT /api/question/:id
// @access  Private
const updateQuestion = AsyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id);

  if (!question) {
    res.status(400);
    throw new Error("Question not found");
  }

  const updatedQuestion = await Question.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedQuestion);
});

module.exports = {
  createQuestion,
  getAllQuestion,
  getQuestionById,
  deleteQuestion,
  updateQuestion,
};