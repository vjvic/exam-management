const express = require("express");
const router = express.Router();
const {
  createQuestionBank,
  getAllQuestionBank,
  getQuestionBankById,
  deleteQuestionBank,
  updateQuestionBank,
} = require("../controllers/questionBankConroller.js");
const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .post(protect, createQuestionBank)
  .get(protect, getAllQuestionBank);
router
  .route("/:id")
  .get(protect, getQuestionBankById)
  .delete(protect, deleteQuestionBank)
  .put(protect, updateQuestionBank);

module.exports = router;
