const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUser,
} = require("../controllers/userController.js");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(registerUser).get(getAllUser);
router.post("/login", loginUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

module.exports = router;
