const app = require("./app");
const cloudinary = require("cloudinary");

// const dotenv = require("dotenv");
const connectDatabase = require("./config/database");

//handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("`Shuttting down the server due to uncaught exception");
  process.exit(1);
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// console.log(youtube)

//connecting to database
connectDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on https://localhost:${process.env.PORT}`);
});

//unhandeled promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("`Shuttting down the server due to unhandled promise rejection");
  server.close(() => {
    process.exit(1);
  });
});
