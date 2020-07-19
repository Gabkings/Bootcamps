const express = require("express");
const bootCanps = require("../models/Bootcamps");

exports.getAllBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await bootCanps.find();
    res.status(201).json({ mgs: "Fetched Sucessfully", data: bootcamp });
  } catch (eUnhandledPromiseRejectionWarning) {
    res.status(400).json({ mgs: "No records found" });
  }
};

exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await bootCanps.create(req.body);
    res.status(201).json({ mgs: "Created Sucessfully", data: bootcamp });
  } catch (eUnhandledPromiseRejectionWarning) {
    res.status(400).json({ msg: "Error occured" });
  }
};
exports.updateBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await bootCanps.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!bootcamp) {
      return res.status(404).json({ msg: "Not Found" });
    }
    res.status(200).json({ mgs: "Updated Sucessfully", data: bootcamp });
  } catch (eUnhandledPromiseRejectionWarning) {
    res.status(400).json({ msg: "Error occured" });
  }
};
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await bootCanps.findByIdAndDelete(req.params.id);
    if (!bootcamp) {
      return res.status(404).json({ msg: "Not Found" });
    }
    res.status(201).json({ mgs: "Deleted Sucessfully", data: bootcamp });
  } catch (eUnhandledPromiseRejectionWarning) {
    res.status(400).json({ msg: "Error occured" });
  }
};
exports.getOneBootcamps = async (req, res, next) => {
  try {
    const bootcamp = await bootCanps.findById(req.params.id);
    if (!bootcamp) {
      return res.status(404).json({ msg: "Not Found" });
    }
    res.status(200).json({ mgs: "Created Sucessfully", data: bootcamp });
  } catch (eUnhandledPromiseRejectionWarning) {
    res.status(400).json({ msg: "Error occured" });
  }
};
