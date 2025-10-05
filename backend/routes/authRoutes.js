import express from "express";
import { signup, verifyEmail, resendVerification, login, getProfile } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.get("/verify/:token", verifyEmail);
router.post("/resend", resendVerification);
router.post("/login", login); // 👈 must exist
router.get("/profile", protect, getProfile);

export default router;
