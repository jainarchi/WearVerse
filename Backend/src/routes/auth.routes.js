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


/**
 * @route GET /api/auth/google/callback
 * @description Google authentication callback after user grant permissions.
 *              redirect to server and hit callback url with auth code then passport send auth code along with secret to google 
 *              get user details, set in req.user and then controller runs
 * @access Public
 */

router.get(
  "/google/callback",
  passport.authenticate(
    "google",           
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
