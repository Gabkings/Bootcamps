const express = require("express");
const ErrorResponse = require("../utils/errorResponses");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geoCoder");
const Bootcamps = require("../models/Bootcamps");
exports.getAllBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamps.find();
  res.status(201).json({ mgs: "Fetched Sucessfully", data: bootcamp });
});

exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamps.create(req.body);
  res.status(201).json({ mgs: "Created Sucessfully", data: bootcamp });
});

exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamps.findByIdAndUpdate(req.params.id, req.body, {
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
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamps.findByIdAndDelete(req.params.id);
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

exports.getOneBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamps.findById(req.params.id);
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

exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide dist by radius of Earth
  // Earth Radius = 3,963 mi / 6,378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamps.find({
    location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps,
  });
});
