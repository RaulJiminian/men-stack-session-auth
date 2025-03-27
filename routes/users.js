import { Router } from "express";
import * as controllers from "../controllers/auth.js";

const router = Router();

router.get("/sign-up", controllers.getSignUp);
router.get("/sign-in", controllers.getSignIn);
router.post("/sign-up", controllers.registerUser);
router.post("/sign-in", controllers.loginUser);
router.get("/vip", isSignedIn, controllers.enterVIP);

export default router;
