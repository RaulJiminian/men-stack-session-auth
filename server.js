import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import logger from "morgan";

const app = express();

const PORT = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(logger("dev"));

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  app.listen(PORT, () => {
    console.log(`The express app is ready on port ${port}!`);
  });
});
