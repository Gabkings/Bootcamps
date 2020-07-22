const express = require("express");
const bootCanps = require("../models/Bootcamps");
const ErrorResponse = require("../utils/errorResponses");
const asynchHandler = require("../middleware/async");

exports.getAllBootcamps = asynchHandler(async (req, res, next) => {
  const bootcamp = await bootCanps.find();
  res.status(201).json({ mgs: "Fetched Sucessfully", data: bootcamp });
});

exports.createBootcamp = asynchHandler(async (req, res, next) => {
  const bootcamp = await bootCanps.create(req.body);
  res.status(201).json({ mgs: "Created Sucessfully", data: bootcamp });
});

exports.updateBootcamp = asynchHandler(async (req, res, next) => {
  const bootcamp = await bootCanps.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No Bootcamps found on the server with id "${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ mgs: "Updated Sucessfully", data: bootcamp });
});
exports.deleteBootcamp = asynchHandler(async (req, res, next) => {
  const bootcamp = await bootCanps.findByIdAndDelete(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No Bootcamps found on the server with id "${req.params.id}`,
        404
      )
    );
  }
  res.status(201).json({ mgs: "Deleted Sucessfully", data: bootcamp });
});

exports.getOneBootcamps = asynchHandler(async (req, res, next) => {
  const bootcamp = await bootCanps.findById(req.params.id);
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No Bootcamps found on the server with id "${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ mgs: "Created Sucessfully", data: bootcamp });
});
