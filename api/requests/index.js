const express = require('express');
const { Requests, User, Notifications } = require('../../models');
const router = express.Router();
const passport = require("passport");
// Send a connection request
router.post('/', async (req, res) => {
  const { sender_id, receiver_id } = req.body;
  console.log('Received connection request:', req.body);
  try {
    if (!sender_id || !receiver_id) {
      return res.status(400).json({ error: 'senderId and receiverId are required' });
    }

    // Check if a request already exists
    const existingRequest = await Requests.findOne({ where: { sender_id:sender_id, receiver_id:receiver_id } });
    if (existingRequest) {
      return res.status(400).json({ error: 'Request already sent' });
    }

    const request = await Requests.create({
      sender_id: sender_id,
      receiver_id: receiver_id,
    });
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Accept or reject a connection request
router.put(
  "/:requestId",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { requestId } = req.params;
    const { status } = req.body;
    console.log(requestId);
    try {
      const request = await Requests.findByPk(requestId);
      if (!request) {
        return res.status(404).json({ error: "Request not found" });
      }

      // Ensure only the receiver can accept/reject the request
      if (req.user.id !== request.receiver_id) {
        return res.status(403).json({ error: "Unauthorized action" });
      }

      request.status = status;
      await request.save();

      // Notify the sender if the request is accepted
      if (status === "accepted") {
        const sender = await User.findByPk(request.sender_id);
        const receiver = await User.findByPk(request.receiver_id);

        // Create a notification
        await Notifications.create({
          user_id: sender.id,
          message: `${receiver.full_name} has accepted your connection request.`,
        });

        console.log(
          `Notification: ${receiver.full_name} has accepted your connection request.`
        );
      }

      res.json(request);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Get received connection requests
router.get(
  "/received/:user_id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { user_id } = req.params;
    console.log(user_id)
    try {
      const requests = await Requests.findAll({
        where: { receiver_id: user_id, status: "pending" },
        include: [
          {
            model: User,
            as: "User",
            attributes: ["id", "full_name", "email"],
          },
        ],
      });
      res.json(requests);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Get sent connection requests
router.get(
  "/sent",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const requests = await Requests.findAll({
        where: { user_id: req.user.id },
        include: [
          {
            model: User,
            as: "targetUser",
            attributes: ["id", "full_name", "email"],
          },
        ],
      });
      res.json(requests);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);


// Check if a request exists
router.get('/check', async (req, res) => {
  const { sender_id, receiver_id } = req.query;
  console.log(req.query);

  try {
     console.log(sender_id,receiver_id);
    const request = await Requests.findOne({ where: { sender_id: sender_id, receiver_id :receiver_id} });
    console.log(request);
    res.json({ exists: !!request });
    console.log(res.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
