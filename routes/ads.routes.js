const express = require("express");
const { AdModel } = require("../models/ad.model");
const { authenticate } = require("../middlewares/authentication");

const Addrouter = express.Router();
Addrouter.use(authenticate);

Addrouter.post("/post-ad", async (req, res) => {
  try {
    const { name, description, category, image, location, date, price } =
      req.body;

    const newAd = await AdModel({
      name,
      description,
      category,
      image,
      location,
      postedAt: date,
      price,
    });

    await newAd.save();

    res.status(200).json({ msg: "Ad posted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

Addrouter.get("/get-ad", async (req, res) => {
  try {
    const data = await AdModel.find();
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

Addrouter.get("/search-ad", async (req, res) => {
  try {
    let name = req.query.name;
    const data = await AdModel.find({
      name: { $regex: name, $options: "i" },
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

Addrouter.delete("/delete-ad/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await AdModel.findByIdAndDelete(id);
    res.status(200).json({ msg: "Ad deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

Addrouter.patch("/edit-ad/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await AdModel.findByIdAndUpdate(id, req.body);
    res.status(200).json({ msg: "Ad updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = { Addrouter };
