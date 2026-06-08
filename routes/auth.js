const express = require("express");
const router = express.Router();

// استدعاء الدوال والميدل وير (مرة واحدة فقط لكل عنصر)
const { login, logout } = require("../controllers/authController");
const authenticate = require("../middleware/authMiddleware");
const validate = require("../middleware/validate");
const loginSchema = require("../validations/authValidation");

// مسار تسجيل الدخول مع التحقق من البيانات (LOGIN)
router.post("/login", validate(loginSchema), login);

// مسار تسجيل الخروج المحمي (LOGOUT)
router.post("/logout", authenticate, logout);

module.exports = router;