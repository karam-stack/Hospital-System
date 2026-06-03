const express = require("express");
const router = express.Router();

const { login, logout } = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const loginSchema = require("../validations/authValidation");

// LOGIN
router.post("/login", validate(loginSchema), login);

// LOGOUT (protected)
router.post("/logout", authenticate, logout);

module.exports = router;
