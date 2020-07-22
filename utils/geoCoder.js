const Nodegeocoder = require("node-geocoder");

const options = {
  provider: "mapquest",
  httpAdapter: "https",
  apiKey: 'g8zP6RnUA0mhiVMUkh3xtWAPRJG8ozHt',
  formatter: null,
};

const geocoder = Nodegeocoder(options);

module.exports = geocoder;
