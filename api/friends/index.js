const express = require('express');
const { User, Request } = require('../../models');
const router = express.Router();
const passport = require('passport');

// Get list of friends
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const sentRequests = await Request.findAll({ where: { senderId: req.user.id, status: 'accepted' } });
    const receivedRequests = await Request.findAll({ where: { receiverId: req.user.id, status: 'accepted' } });

    const friendIds = [
      ...sentRequests.map(request => request.receiverId),
      ...receivedRequests.map(request => request.senderId),
    ];

    const friends = await User.findAll({ where: { id: friendIds } });

    res.json(friends);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
