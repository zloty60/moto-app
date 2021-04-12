const mongoose = require("mongoose");

exports.connectToProdDB = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL_PROD, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB PROD connection successful!"));
};

exports.connectToDevDB = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL_DEV, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("DB DEV connection successful!"));
};
