const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/exam", require("./routes/examRoutes"));
app.use("/api/question", require("./routes/questionRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
