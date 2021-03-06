const express = require("express");
const router = express.Router();
const {
  createResult,
  getAllResult,
  getResultById,
  getMyResult,
} = require("../controllers/resultController.js");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createResult).get(protect, getAllResult);
router.get("/myresult", protect, getMyResult);
router.route("/:id").get(protect, getResultById);

module.exports = router;
