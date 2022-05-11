const express = require("express");
const router = express.Router();
const {
  createExam,
  getAllExam,
  getExamById,
  deleteExam,
  updateExam,
  getExamByCode,
  FinishedExam,
} = require("../controllers/examController.js");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createExam).get(protect, getAllExam);
router.post("/finishedexam", protect, FinishedExam);
router.get("/single/:code", protect, getExamByCode);
router
  .route("/:id")
  .get(protect, getExamById)
  .delete(protect, deleteExam)
  .put(protect, updateExam);

module.exports = router;
