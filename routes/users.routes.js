const express = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/users.model");

const UserRouter = express.Router();

UserRouter.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (user) {
      res.status(400).json({ message: "User already exists" });
    }

    const newUser = await UserModel({ email, password });
    await newUser.save();

    res.status(200).json({ msg: "Register Successful" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

UserRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(400).json({ message: "User does not exists" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ msg: "Login Successful", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { UserRouter };
