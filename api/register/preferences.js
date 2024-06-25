const express = require("express");
const { Preferences } = require("../../models");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      user_id,
      preferred_date,
      preferred_veg_nonveg,
      preference_checklist,
      have_room,
    } = req.body;

    // Validate input
    if (
      !user_id ||
      !preferred_date ||
      !preferred_veg_nonveg ||
      !preference_checklist ||
      !have_room
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create preferences
    const newPreferences = await Preferences.create({
      user_id,
      preferred_date,
      preferred_veg_nonveg,
      preference_checklist,
      have_room,
    });

    res.status(201).json({ preferences: newPreferences });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
