const path = require("path");
const express = require(`express`);
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");
const compression = require("compression");

const offerRouter = require("./routes/offerRoutes");
const userRouter = require("./routes/userRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./middleware/errorHandler");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        connectSrc: ["'self'"],
        frameSrc: ["'self'"],
        childSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        fontSrc: ["'self'"],
        imgSrc: ["'self'", "blob: data:", "https://res.cloudinary.com"],
        baseUri: ["'self'"],
        objectSrc: ["'self'"],
      },
    },
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  console.log("prod");
}

const limiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in a hour!",
});

app.use(limiter);

app.use(express.json({ limit: "50kb" }));
app.use(mongoSanitize());
app.use(xss());
app.use(
  hpp({
    whitelist: [
      "brand",
      "carBody",
      "fuel",
      "price",
      "mileage",
      "yearOfProduction",
      "createdBy",
    ],
  })
);

app.use(compression());

app.use("/api/v1/offers", offerRouter);
app.use("/api/v1/users", userRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/../frontend/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "..", "frontend", "build", "index.html"))
  );
}

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on the server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;

//
