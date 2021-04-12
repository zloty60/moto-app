const express = require("express");
const userController = require("./../controllers/userController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);

router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);
router.patch(
  "/updateCurrentUser",
  authController.protect,
  userController.updateCurrentUser
);

module.exports = router;
