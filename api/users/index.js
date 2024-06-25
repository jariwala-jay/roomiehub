const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { User, Preferences ,Notification } = require('../../models');
const router = express.Router();
const { Op } = require('sequelize'); // Import Op from Sequelize

const secretKey = 'roomiehub'; // Use a secure key in production

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
   
    const token = jwt.sign({ id: newUser.id }, secretKey, { expiresIn: '1h' });
    res.status(201).json({user: newUser,token});
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

router.post('/preferences', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const { gender, age_min, age_max, budget_min, budget_max, veg_nonveg } = req.body;
    const userId = req.user.id;
    // Check if preferences already exist for this user
    // const existingPreferences = await Preferences.findOne({ where: { userId } });
    // if (existingPreferences) {
    //   return res.status(400).json({ error: 'Preferences already set for this user.' });
    // }
    
    // Create new preferences
    const newPreferences = await Preferences.create({
      userId,
      gender,
      age_min,
      age_max,
      budget_min,
      budget_max,
      veg_nonveg,
    });
    res.status(201).json(newPreferences);
  } catch (error) {
    res.status(400).json({ error1: error.message });
  }
});

router.put('/preferences', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { gender, age_min, age_max, budget_min, budget_max, veg_nonveg } = req.body;
  try {
    const preferences = await Preferences.findOne({ where: { userId: req.user.id } });
    if (!preferences) {
      return res.status(404).json({ error: 'Preferences not found' });
    }
    preferences.gender = gender;
    preferences.age_min = age_min;
    preferences.age_max = age_max;
    preferences.budget_min = budget_min;
    preferences.budget_max = budget_max;
    preferences.veg_nonveg = veg_nonveg;
    await preferences.save();
    res.json(preferences);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Protected route to get user preferences
router.get('/preferences', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const preferences = await Preferences.findOne({ where: { userId: req.user.id } });
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
