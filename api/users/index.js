const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User, Preferences, Notification } = require('../../models');
const router = express.Router();
const { Op } = require('sequelize');

const secretKey = 'roomiehub'; // Use a secure key in production

// Create a new user
router.post('/register', async (req, res) => {
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
router.put('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const {
      full_name,
      email,
      contact_no,
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

    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.full_name = full_name || user.full_name;
    user.email = email || user.email;
    user.contact_no = contact_no || user.contact_no;
    user.city = city || user.city;
    user.university = university || user.university;
    user.profile_pic = profile_pic || user.profile_pic;
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
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }
  try {
    const notifications = await Notification.findAll({ where: { userId } });
    res.json(notifications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Define your searchAll endpoint
router.post('/searchAll', async (req, res) => {
  try {
    const { gender, budget, city, age, veg_nonveg } = req.body;

    const criteria = {
      age: { [Op.between]: age },
      budget: { [Op.between]: budget },
      ...(gender !== 'Any' && { gender }),
      ...(veg_nonveg !== 'Any' && { veg_nonveg }),
      ...(city && { city: { [Op.iLike]: `%${city}%` } }),
    };

    const users = await User.findAll({
      where: criteria,
    });

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
