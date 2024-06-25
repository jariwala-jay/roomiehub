const express = require("express");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      full_name,
      email,
      contact_no,
      password,
      city,
      university,
      profile_pic,
      age,
      gender,
      budget,
      veg_nonveg,
      drinker,
      smoker,
      description,
      have_room,
    } = req.body;

    // Validate input
    if (
      !full_name ||
      !email ||
      !contact_no ||
      !password ||
      !city ||
      !university ||
      !profile_pic ||
      !age ||
      !gender ||
      !budget ||
      !veg_nonveg ||
      !drinker ||
      !smoker ||
      !description ||
      have_room === undefined
    ) {
      console.log("inside validation");
      return res.status(400).json({ error: "All fields are required" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("creating new user");
    // Create user
    const newUser = await User.create({
      full_name,
      email,
      contact_no,
      password: hashedPassword,
      city,
      university,
      profile_pic,
      age,
      gender,
      budget,
      veg_nonveg,
      drinker,
      smoker,
      description,
      have_room,
    });
    console.log("created new user");
    res.status(201).json({ user: newUser });
  } catch (error) {
    console.log("inside creating user fail message");
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
