const mongoose = require("mongoose");

const currentYear = new Date().getFullYear();

const offerSchema = new mongoose.Schema({
  offerHeader: {
    type: String,
    required: [true, "offer header is required"],
    trim: true,
    maxLength: 150,
  },
  brand: {
    type: String,
    required: [true, "brand is required"],
    enum: [
      "audi",
      "bmw",
      "volkswagen",
      "mercedes-benz",
      "renault",
      "skoda",
      "toyota",
      "opel",
      "ford",
      "kia",
      "others",
    ],
  },
  carBody: {
    type: String,
    required: [true, "car body is required"],
    enum: [
      "cabriolet",
      "sedan",
      "coupe",
      "kombi",
      "pickup",
      "hatchback",
      "off-road",
      "suv",
    ],
  },
  fuel: {
    type: String,
    required: [true, "type of fuel is required"],
    enum: ["petrol", "diesel", "lpg", "hybrid", "electric"],
  },
  price: {
    type: Number,
    required: [true, "price is required"],
    min: 1,
    max: 100000000,
  },
  mileage: {
    type: Number,
    required: [true, "mileage is required"],
    min: 1,
    max: 100000000,
  },
  yearOfProduction: {
    type: Number,
    min: 1900,
    max: currentYear,
    required: [true, "year of production is required"],
  },
  offerDescription: {
    type: String,
    required: [true, "offer description is required"],
    trim: true,
    maxLength: 5000,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  updatedAt: {
    type: Date,
    select: false,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  images: {
    type: [String],
    validate: [
      (v) => Array.isArray(v) && v.length > 0,
      "Dodaj przynajmniej jedno zdjęcie",
    ],
  },
  featured: {
    type: Boolean,
    default: false,
  },
});

offerSchema.pre("findOneAndUpdate", function () {
  this.set({ updatedAt: Date.now() });
});

offerSchema.pre(/^find/, function (next) {
  this.select("-__v");
  this.populate({
    path: "createdBy",
    select: "name",
  });
  next();
});

const Offer = mongoose.model("Offer", offerSchema);
module.exports = Offer;
