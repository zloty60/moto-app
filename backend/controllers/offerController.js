const multer = require("multer");

const Offer = require("./../models/offerModel");
const factory = require("./../middleware/factoryHandler");
const AppError = require("./../utils/appError");
const asyncHandler = require("./../middleware/asyncHandler");
const cloudinary = require("./../utils/cloudinary");

const multerFilter = (req, file, cb) => {
  if (
    (file.mimetype === "image/png",
    file.mimetype === "image/jpg",
    file.mimetype === "image/jpeg")
  ) {
    cb(null, true);
  } else {
    cb(new AppError("Only .png, .jpg, .jpeg format allowed!", 400), false);
  }
};

const parser = multer({
  storage: multer.diskStorage({}),
  fileFilter: multerFilter,
  limits: { fileSize: 8388608 },
});

exports.uploadImages = parser.array("images", 5);

exports.saveImagesInCloud = asyncHandler(async (req, res, next) => {
  if (!req.files.length) {
    return next(new AppError(" Dodaj przynajmniej jedno zdjęcie!", 400));
  }

  req.body.images = [];

  await Promise.all(
    req.files.map(async (file) => {
      const cloudinaryRes = await cloudinary.uploader.upload(file.path, {
        folder: "MotoApp",
        allowed_formats: ["jpeg", "png", "jpg"],
        transformation: [{ width: 2000, height: 1333, crop: "fill" }],
      });
      req.body.images.push(cloudinaryRes.url);
    })
  );
  next();
});

exports.getfeaturedOffers = (req, res, next) => {
  req.query.limit = "6";
  req.query.featured = "true";
  next();
};

exports.getAllOffers = factory.getAll(Offer);
exports.getOffer = factory.getOne(Offer);
exports.createOffer = factory.createOne(
  Offer,
  "offerHeader",
  "brand",
  "carBody",
  "fuel",
  "price",
  "yearOfProduction",
  "mileage",
  "offerDescription",
  "images"
);
exports.updateOffer = factory.updateOne(
  Offer,
  "offerHeader",
  "brand",
  "carBody",
  "fuel",
  "price",
  "yearOfProduction",
  "mileage",
  "offerDescription",
  "images"
);
exports.deleteOffer = factory.deleteOne(Offer);
