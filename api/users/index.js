const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../../models');
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

    res.status(201).json(newUser);
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
    const { name, age, gender, contact_info, email, country, state, city, university, budget, veg_nonveg, other_requirements } = req.body;
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.name = name || user.name;
    user.age = age || user.age;
    user.gender = gender || user.gender;
    user.contact_info = contact_info || user.contact_info;
    user.email = email || user.email;
    user.country = country || user.country;
    user.state = state || user.state;
    user.city = city || user.city;
    user.university = university || user.university;
    user.budget = budget || user.budget;
    user.veg_nonveg = veg_nonveg || user.veg_nonveg;
    user.other_requirements = other_requirements || user.other_requirements;

    await user.save();

    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
