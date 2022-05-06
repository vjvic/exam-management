const AsyncHandler = require("express-async-handler");
const Exam = require("../model/examModel");

// @desc    create exam
// @route   POST /api/exam
// @access  Private
const createExam = AsyncHandler(async (req, res) => {
  const exam = await Exam.create(req.body);

  res.status(200).json(exam);
});

// @desc    get all exam
// @route   GET /api/exam
// @access  Private
const getAllExam = AsyncHandler(async (req, res) => {
  const exam = await Exam.find({});

  //Random exam
  /* const exam = await Exam.aggregate([{ $sample: { size: 2 } }]); */

  res.status(200).json(exam);
});

// @desc    get exam by id
// @route   GET /api/exam/:id
// @access  Private
const getExamById = AsyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    res.status(400);
    throw new Error("Exam not found");
  }

  res.status(200).json(exam);
});

// @desc    Delete exam
// @route   DELETE /api/exam/:id
// @access  Private
const deleteExam = AsyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    res.status(400);
    throw new Error("Exam not found");
  }

  await exam.deleteOne(exam);

  res.status(200).json({ id: exam._id });
});

// @desc    update exam
// @route   PUT /api/exam/:id
// @access  Private
const updateExam = AsyncHandler(async (req, res) => {
  const exam = await Exam.findById(req.params.id);

  if (!exam) {
    res.status(400);
    throw new Error("Exam not found");
  }

  const updatedExam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedExam);
});

module.exports = {
  createExam,
  getAllExam,
  getExamById,
  deleteExam,
  updateExam,
};
