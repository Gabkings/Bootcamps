const express = require("express");

exports.getAllBootcamps = (req, res, next) => {
  return res.json({ msg: "All bootcamps" });
};

exports.createBootcamp = (req, res, next) => {
  return res.json({ msg: "Create new Bootcamp" });
};
exports.updateBootcamp = (req, res, next) => {
  return res.json({ msg: "Update bootcamp" });
};
exports.deleteBootcamp = (req, res, next) => {
  return res.json({ msg: "Delete bootcamp" });
};
exports.getOneBootcamps = (req, res, next) => {
  return res.json({ msg: "Get one Bootcamps" });
};
