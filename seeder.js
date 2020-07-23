const fs = require("fs");
const Bootcamps = require("./models/Bootcamps");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//load env file

dotenv.config({ path: "./config/config.env" });

//connct database

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//read JSON files

const bootcampsData = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/bootcamps.json`, "utf-8")
);

//import into db

const importData = async () => {
  try {
    await Bootcamps.create(bootcampsData);
    console.log("Data imported");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const deleteDate = async () => {
  try {
    await Bootcamps.deleteMany();
    console.log("Data has been deleted")
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] == "-i") {
  importData();
} else if (process.argv[2] == "-d") {
  deleteDate();
}
