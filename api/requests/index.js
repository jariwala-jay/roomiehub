const express = require('express');
const { Request } = require('../../models');
const router = express.Router();

// Send a connection request
router.post('/', async (req, res) => {
    const { senderId, receiverId } = req.body;
    console.log('Received connection request:', req.body); // Log the request body
    try {
      if (!senderId || !receiverId) {
        return res.status(400).json({ error: 'senderId and receiverId are required' });
      }
      const request = await Request.create({ senderId, receiverId });
      res.status(201).json(request);
    } catch (error) {
      console.error('Error creating request:', error); // Log any errors
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
    res.json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
