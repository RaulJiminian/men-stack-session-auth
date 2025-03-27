import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import methodOverride from "method-override";
import logger from "morgan";
import session from "express-session";
import router from "./controllers/auth.js";

const app = express();

const PORT = process.env.PORT ? process.env.PORT : "3000";

mongoose.connect(process.env.MONGODB_URI);

// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(logger("dev"));
// Set View Engine to ejs templating
app.set("view engine", "ejs");
// Configure session based Auth
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.render("index", {
    user: req.session.user
  });
});

app.use("/auth", router);

mongoose.connection.on("connected", () => {
  console.clear();
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  app.listen(PORT, () => {
    console.log(`The express app is ready on port ${PORT}!`);
  });
});
