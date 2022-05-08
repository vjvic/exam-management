const AsyncHandler = require("express-async-handler");
const Result = require("../model/resultModel");

// @desc    create result
// @route   POST /api/result
// @access  Private
const createResult = AsyncHandler(async (req, res) => {
  const result = await Result.create(req.body);

  res.status(200).json(result);
});

// @desc    get all result
// @route   GET /api/result
// @access  Private
const getAllResult = AsyncHandler(async (req, res) => {
  const result = await Result.find({});

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
};
