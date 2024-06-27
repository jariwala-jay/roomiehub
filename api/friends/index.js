const express = require('express');
const { User, Requests } = require('../../models');
const router = express.Router();
const passport = require('passport');

// Get list of friends
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const sentRequests = await Requests.findAll({ where: { sender_id: req.user.id, status: 'accepted' } });
    const receivedRequests = await Requests.findAll({ where: { receiver_id: req.user.id, status: 'accepted' } });

    const friendIds = [
      ...sentRequests.map(request => request.receiver_id),
      ...receivedRequests.map(request => request.sender_id),
    ];

    const friends = await User.findAll({ where: { id: friendIds } });

    res.json(friends);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
