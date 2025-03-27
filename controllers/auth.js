import { Router } from "express";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const router = Router();

// list our routes
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up");
});

router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in");
});

router.post("/sign-up", async (req, res) => {
  // Check if password and confirm password match
  if (req.body.password !== req.body.confirmPassword) {
    return res.send("Password and Confirm Password must match");
  }

  // Check if username already in database
  const userInDB = await User.findOne({ username: req.body.username });
  if (userInDB) {
    return res.send("Username already taken.");
  }

  // Hash our plain-text password before saving to DB (for security)
  const hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = await User.create({
    username: req.body.username,
    password: hashedPassword,
  });

  res.send(`Thanks for signing up ${user.username}`);
});

router.post("/sign-in", async (req, res) => {
  const userInDatabase = await User.findOne({ username: req.body.username });
  if (!userInDatabase) {
    return res.send("Login failed. Please try again.");
  }

  const validPassword = bcrypt.compareSync(
    req.body.password,
    userInDatabase.password
  );

  if (!validPassword) {
    return res.send("Login failed. Please try again.");
  }

  req.session.user = {
    _id: userInDatabase._id,
    username: userInDatabase.username,
  };

  res.redirect("/");
});

export default router;
