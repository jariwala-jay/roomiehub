const express = require('express');
const { Request, User, Notification } = require('../../models');
const router = express.Router();

// Send a connection request
router.post('/', async (req, res) => {
  const { senderId, receiverId } = req.body;
  console.log('Received connection request:', req.body);
  try {
    if (!senderId || !receiverId) {
      return res.status(400).json({ error: 'senderId and receiverId are required' });
    }

    // Check if a request already exists
    const existingRequest = await Request.findOne({ where: { senderId, receiverId } });
    if (existingRequest) {
      return res.status(400).json({ error: 'Request already sent' });
    }

    const request = await Request.create({ senderId, receiverId });
    res.status(201).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Accept or reject a connection request
router.put('/:requestId', async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body;
  try {
    const request = await Request.findByPk(requestId);
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    request.status = status;
    await request.save();

    // Notify the sender if the request is accepted
    if (status === 'accepted') {
      const sender = await User.findByPk(request.senderId);
      const receiver = await User.findByPk(request.receiverId);
      
      // Create a notification
      await Notification.create({
        userId: sender.id,
        message: `${receiver.name} has accepted your connection request.`
      });

      console.log(`Notification: ${receiver.name} has accepted your connection request.`);
    }

    res.json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get received connection requests
router.get('/received/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const requests = await Request.findAll({ where: { receiverId: userId, status: 'pending' } });
    res.json(requests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Check if a request exists
router.get('/check', async (req, res) => {
  const { senderId, receiverId } = req.query;
  try {
    const request = await Request.findOne({ where: { senderId, receiverId } });
    res.json({ exists: !!request });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
