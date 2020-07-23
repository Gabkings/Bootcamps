const express = require("express");
const router = express.Router();
//import controllers
const bootCampsActions = require("../controllers/bootcampController");

router.route("/").get(bootCampsActions.getAllBootcamps).post(bootCampsActions.createBootcamp);
router
  .route("/:id")
  .get(bootCampsActions.getOneBootcamps)
  .put(bootCampsActions.updateBootcamp)
  .delete(bootCampsActions.deleteBootcamp);

router.route('/radius/:zipcode/:distance').get(bootCampsActions.getBootcampsInRadius)

module.exports = router;
