const express = require("express");
const offerController = require("../controllers/offerController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/featured-offers")
  .get(offerController.getfeaturedOffers, offerController.getAllOffers);

router
  .route("/")
  .get(offerController.getAllOffers)
  .post(
    authController.protect,
    authController.restrictTo("admin", "user"),
    offerController.uploadImages,
    offerController.saveImagesInCloud,
    offerController.createOffer
  );

router
  .route("/:id")
  .get(offerController.getOffer)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "user"),
    offerController.deleteOffer
  )
  .patch(
    authController.protect,
    authController.restrictTo("admin", "user"),
    offerController.updateOffer
  );

module.exports = router;
