const express = require("express");
const dotenv = require("dotenv");

// load config file
dotenv.config({ path: "./config/config.env" });

//intialize express
const app = express();

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
