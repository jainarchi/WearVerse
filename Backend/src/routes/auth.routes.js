import { Router } from "express";
import {
  registerUser,
  loginUser,
  googleCallback,
  getMe,
  logout
} from "../controllers/auth.controllers.js";
import {
  validateRegister,
  validateLogin,
} from "../validation/auth.validator.js";
import passport from "passport";
import { config } from "../config/config.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
router.post("/register", validateRegister, registerUser);

/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access Public
 */

router.post("/login", validateLogin, loginUser);

/**
 * @route GET /api/auth/google
 * @description Authenticate with Google, server will redirect to Google
 * @access Public
 */
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

7;
/**
 * @route GET /api/auth/google/callback
 * @description Google authentication callback after user grant permissions.
 *              Auth code comes in req.params from client side
 *              exchange auth code with user details from google, user details availabe in req.user
 * @access Public
 */

router.get(
  "/google/callback",
  passport.authenticate(
    "google", // also check code is valid or not and get details from google then controller run
    {
      failureRedirect:
        config.NODE_ENV === "development"
          ? "http://localhost:5173/login"
          : "/login",
      session: false,
    },
  ),
  googleCallback,
);

/**
 * @route GET /api/auth/me
 * @description Get user details
 * @access Private
 */

router.get("/me", authenticateUser, getMe);

/**
 * @route POST /api/auth/logout
 * @description Logout user
 * @access Private
 */

router.post("/logout", authenticateUser, logout);

export default router;
