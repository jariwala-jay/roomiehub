const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User, Preferences } = require('../../models');
const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { name, age, gender, contact_info, email, country, state, city, university, budget, veg_nonveg, other_requirements, password } = req.body;
    
    // Validate input
    if (!name || !age || !gender || !contact_info || !email || !country || !state || !city || !university || !budget || !veg_nonveg || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await User.create({
      name,
      age,
      gender,
      contact_info,
      email,
      country,
      state,
      city,
      university,
      budget,
      veg_nonveg,
      other_requirements,
      hashed_password: hashedPassword,
    });

    // Create default preferences
    await Preferences.create({
      userId: newUser.id,
      gender: 'Any',
      age_min: 18,
      age_max: 100,
      budget_min: 0,
      budget_max: 100000,
      veg_nonveg: 'Any',
    });

    res.status(201).json({ user: newUser, token: 'dummy-token' }); // Replace with actual token generation
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Protected route to get user profile
router.get('/profile', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, { include: [{ model: Preferences, as: 'preferences' }] });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Protected route to update user preferences
router.put('/preferences', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { gender, age_min, age_max, budget_min, budget_max, veg_nonveg } = req.body;
    const preferences = await Preferences.findOne({ where: { userId: req.user.id } });

    if (!preferences) {
      return res.status(404).json({ error: 'Preferences not found' });
    }

    preferences.gender = gender || preferences.gender;
    preferences.age_min = age_min || preferences.age_min;
    preferences.age_max = age_max || preferences.age_max;
    preferences.budget_min = budget_min || preferences.budget_min;
    preferences.budget_max = budget_max || preferences.budget_max;
    preferences.veg_nonveg = veg_nonveg || preferences.veg_nonveg;

    await preferences.save();
    res.json(preferences);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
