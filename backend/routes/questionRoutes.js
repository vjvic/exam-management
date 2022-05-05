const express = require("express");
const router = express.Router();
const {
  createQuestion,
  getAllQuestion,
  getQuestionById,
  deleteQuestion,
  updateQuestion,
  getQuestionByQuestionBank,
} = require("../controllers/questionController.js");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createQuestion).get(protect, getAllQuestion);
router.get("/qbquestion/:id", protect, getQuestionByQuestionBank);
router
  .route("/:id")
  .get(protect, getQuestionById)
  .delete(protect, deleteQuestion)
  .put(protect, updateQuestion);

module.exports = router;
