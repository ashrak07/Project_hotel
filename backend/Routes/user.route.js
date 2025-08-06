const express = require("express");
const {
  getUserById,
  getAllUsers,
  registerUser,
  loginUser,
  deleteUser,
} = require("../Controllers/user.controller.js");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.post("/user/register", registerUser);

router.post("/user/login", loginUser);

router.get("/user/:id", getUserById);

// router.get("/user/", validateToken, getAllUsers);
router.get("/user/", validateToken, getAllUsers);

router.delete("/user/:id", deleteUser);

module.exports = router;
