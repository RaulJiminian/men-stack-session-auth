import { Router } from "express";

const router = Router();

// list our routes
router.get("/sign-up", (req, res) => {
  res.render("auth/sign-up");
});

export default router;
