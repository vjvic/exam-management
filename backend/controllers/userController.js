const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

// @desc    create user
// @route   POST /api/user/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { fName, lName, email, password, profilePic, role } = req.body;

  //Check if user email exists
  const emailExist = await User.findOne({ email });

  if (emailExist) {
    res.status(400);
    throw new Error("Email already exist");
  }

  //Hash password
  salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    fName,
    lName,
    email,
    profilePic,
    role,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      fName: user.fName,
      lName: user.lName,
      email: user.email,
      profilePic: user.profilePic,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    login user
// @route   GET /api/user/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      fName: user.fName,
      lName: user.lName,
      email: user.email,
      profilePic: user.profilePic,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//@desc User profile
//@route GET /api/user/profile
//@access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      fName: user.fName,
      lName: user.lName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Get all user
//@route GET /api/user
//@access Private
const getAllUser = asyncHandler(async (req, res) => {
  const user = await User.find({});

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Update user profile
//@route PUT /api/user/profile
//@access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.fName = req.body.fName || user.fName;
    user.lName = req.body.lName || user.lName;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      //Hash password
      salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      fName: updatedUser.fName,
      lName: updatedUser.lName,
      email: updatedUser.email,
      role: updatedUser.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getAllUser,
};
