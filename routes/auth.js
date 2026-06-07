const express = require("express");
const router = express.Router();

<<<<<<< HEAD
const { login, logout } = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const loginSchema = require("../validations/authValidation");

// LOGIN
router.post("/login", validate(loginSchema), login);

// LOGOUT (protected)
router.post("/logout", authenticate, logout);
=======
const { login, logout } = require('../controllers/authController');

const authenticate = require('../middleware/authMiddleware');

const validate = require('../middleware/validate');

const {
    loginSchema
} = require('../validations/authValidation');

// LOGIN
router.post(
    '/login',
    validate(loginSchema),
    login
);

// LOGOUT
router.post(
    '/logout',
    authenticate,
    logout
);
>>>>>>> f198b8b751ef11c81d8f23b82c39ceb9fe5b71d3

module.exports = router;
