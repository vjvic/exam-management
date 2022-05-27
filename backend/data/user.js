const bcrypt = require("bcryptjs");

const users = [
  {
    fName: "Admin",
    lName: " ",
    email: "admin@admin.com",
    password: bcrypt.hashSync("admin", 10),
    role: "admin",
  },
];

module.exports =  users;
