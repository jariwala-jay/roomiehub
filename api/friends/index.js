const express = require('express');
const { User, Requests, Chat } = require('../../models');
const router = express.Router();
const passport = require('passport');
const { Op } = require("sequelize");
// Get list of friends
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const sentRequests = await Requests.findAll({
      where: { sender_id: req.user.id, status: "accepted" },
    });
    const receivedRequests = await Requests.findAll({
      where: { receiver_id: req.user.id, status: "accepted" },
    });

    const friendIds = [
      ...sentRequests.map((request) => request.receiver_id),
      ...receivedRequests.map((request) => request.sender_id),
    ];

    const friends = await User.findAll({ where: { id: friendIds } });

    // Fetch latest message for each friend
    for (const friend of friends) {
      const latestMessage = await Chat.findOne({
        where: {
          [Op.or]: [
            { sender_id: req.user.id, receiver_id: friend.id },
            { sender_id: friend.id, receiver_id: req.user.id },
          ],
        },
        order: [["timestamp", "DESC"]],
      });

      friend.dataValues.latestMessage = latestMessage;
    }
    res.json(friends);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
