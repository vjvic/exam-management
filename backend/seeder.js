const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const user = require("./data/user");
const settings = require("./data/settings");
const User = require("./model/userModel");
const Settings = require("./model/settingsModel");
const connectDB = require("./config/db.js");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    /*     await Settings.deleteMany();
    await User.deleteMany(); */

    await User.insertMany(user);
    await Settings.insertMany(settings);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Settings.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
