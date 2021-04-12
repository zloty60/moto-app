const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config();
const connectToDB = require("./config/db");

if (process.env.NODE_ENV === "development") {
  connectToDB.connectToDevDB();
} else {
  connectToDB.connectToProdDB();
}

const app = require("./app");
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
