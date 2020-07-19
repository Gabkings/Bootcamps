const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

//import router for the endpoints
const bootcamps = require("./routes/bootcamps");
const db = require("./config/db");

// load config file
dotenv.config({ path: "./config/config.env" });
db();

//intialize express
const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json())
app.use("/api/v1/bootcamps", bootcamps);

const PORT = process.env.PORT;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
