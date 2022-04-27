require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/api", require("./routes/authRouter"));

const URL = process.env.MONGO_URL;
mongoose.connect(URL, () => {
  console.log("Connected to MongoDB");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("포트 서버 시작", port);
});
