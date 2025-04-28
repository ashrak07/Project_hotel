const Users = require("../Models/userModel.js");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log("request body:", req.body);
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await Users.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed password:", hashedPassword);
  const user = await Users.create({
    name,
    email,
    password: hashedPassword,
  });
  res.status(200).json(user);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  //compare password with hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          // username: user.name,
          // email: user.email,
          id: user.id,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.status(200).json({
      name: user.name,
      mail: user.email,
      accessToken: accessToken,
    });
  } else {
    res.status(201);
    throw new Error("email or password not valid");
  }
});

const getUserById = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await Users.findById(id);
  res.status(200).json({ user });
});

const deleteUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await Users.deleteOne({ _id: id });

  // Récupérer tous les user restantes
  const remainingUser = await Users.find();

  res.status(200).json({
    message: "Users  lists",
    data: remainingUser,
    count: remainingUser.length,
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const user = await Users.find().lean();
  res.status(200).json({
    message: "All users",
    count: user.length,
    data: user,
  });
});

module.exports = {
  registerUser,
  getUserById,
  getAllUsers,
  registerUser,
  loginUser,
  deleteUser,
};
