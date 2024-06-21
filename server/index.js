require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const router = require("./routes/index");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api", router);
app.use(cookieParser());
async function start() {
  try {
    await mongoose.connect(process.env.DB);
    app.listen(process.env.PORT, () => {
      console.log(`App listening in http://localhost:${process.env.PORT}`);
    });
  } catch (error) {}
}

start();
