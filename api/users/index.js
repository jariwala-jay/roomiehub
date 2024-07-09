const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const multer = require("multer");
const { User, Preferences, Notifications } = require('../../models');
const router = express.Router();
const { Op } = require('sequelize');

const secretKey = 'roomiehub'; // Use a secure key in production

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


// Create a new user
router.post('/register', upload.single('profile_pic'), async (req, res) => {
  try {
    const {
      full_name,
      email,
      contact_no,
      password,
      city,
      university,
      age,
      gender,
      budget,
      veg_nonveg,
      drinker,
      smoker,
      description,
      have_room,
    } = req.body;
    const profile_pic = req.file ? req.file.buffer : null;
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
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

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

    const token = jwt.sign({ id: newUser.id }, secretKey, { expiresIn: '1h' });
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Protected route to get user profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});

// Protected route to update user profile
router.put('/profile', upload.single('profile_pic'), passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const {
      full_name,
      email,
      contact_no,
      city,
      university,
      age,
      gender,
      budget,
      veg_nonveg,
      drinker,
      smoker,
      description,
      have_room,
    } = req.body;

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (req.file) {
      user.profile_pic = req.file.buffer;
    }

    user.full_name = full_name || user.full_name;
    user.email = email || user.email;
    user.contact_no = contact_no || user.contact_no;
    user.city = city || user.city;
    user.university = university || user.university;
    user.age = age || user.age;
    user.gender = gender || user.gender;
    user.budget = budget || user.budget;
    user.veg_nonveg = veg_nonveg || user.veg_nonveg;
    user.drinker = drinker || user.drinker;
    user.smoker = smoker || user.smoker;
    user.description = description || user.description;
    user.have_room = have_room !== undefined ? have_room : user.have_room;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.post('/preferences', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { preferred_date, preferred_veg_nonveg, preference_checklist, have_room } = req.body;
    const userId = req.user.id;

    const newPreferences = await Preferences.create({
      user_id: userId,
      preferred_date,
      preferred_veg_nonveg,
      preference_checklist,
      have_room,
    });
    res.status(201).json(newPreferences);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/preferences', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { preferred_date, preferred_veg_nonveg, preference_checklist, have_room } = req.body;
  try {
    const preferences = await Preferences.findOne({ where: { user_id: req.user.id } });
    if (!preferences) {
      return res.status(404).json({ error: 'Preferences not found' });
    }
    preferences.preferred_date = preferred_date;
    preferences.preferred_veg_nonveg = preferred_veg_nonveg;
    preferences.preference_checklist = preference_checklist;
    preferences.have_room = have_room;
    await preferences.save();
    res.json(preferences);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/preferences', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const preferences = await Preferences.findOne({ where: { user_id: req.user.id } });
    if (!preferences) {
      return res.status(404).json({ error: 'Preferences not found' });
    }
    res.json(preferences);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to search for roommates
router.post('/search', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { gender, age_min, age_max, budget_min, budget_max, veg_nonveg } = req.body;

    const whereClause = {
      age: { [Op.between]: [age_min, age_max] },
      budget: { [Op.between]: [budget_min, budget_max] },
      veg_nonveg: veg_nonveg === 'Any' ? { [Op.or]: ['Veg', 'Non-Veg'] } : veg_nonveg,
    };

    if (gender !== 'Any') {
      whereClause.gender = gender;
    }

    console.log("Search criteria:", whereClause); // Debugging line

    const users = await User.findAll({ where: whereClause });

    console.log("Number of users found:", users.length); // Debugging line
    res.json(users);
  } catch (error) {
    console.error("Error searching for roommates:", error);
    res.status(400).json({ error: error.message });
  }
});

router.get('/notifications', async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) {
    return res.status(400).json({ error: 'userId is required' });
  }
  try {
    const notifications = await Notifications.findAll({
      where: { user_id },
      include: [
        {
          model: User,
          as: 'sender', // Adjust this alias to match your Sequelize model associations
          attributes: ['id', 'full_name', 'profile_pic'],
        }
      ],
    });
    res.json(notifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route to search for roommates
router.post(
  "/searchAll",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const {
        preferred_veg_nonveg,
        preference_checklist,
        have_room,
        city,
        budget_min,
        budget_max,
      } = req.body;
      console.log(req.body);

      let whereClause = {
        veg_nonveg:
          preferred_veg_nonveg === "Any"
            ? { [Op.or]: ["Veg", "Non-Veg"] }
            : preferred_veg_nonveg,
        have_room: have_room === "Any" ? { [Op.or]: ["yes", "no"] } : have_room,
        budget: { [Op.between]: [budget_min, budget_max] },
      };

      if (city) {
        whereClause.city = city;
      }

      if (
        preference_checklist.includes("male only") &&
        !preference_checklist.includes("female only")
      ) {
        whereClause.gender = "Male";
      } else if (
        preference_checklist.includes("female only") &&
        !preference_checklist.includes("male only")
      ) {
        whereClause.gender = "Female";
      }

      if (preference_checklist.includes("non-drinker")) {
        whereClause.drinker = "no";
      }

      if (preference_checklist.includes("non-smoker")) {
        whereClause.smoker = "no";
      }

      const users = await User.findAll({ where: whereClause });
      res.json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
