const express = require('express');
const bcrypt = require('bcrypt');
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

module.exports = router;
