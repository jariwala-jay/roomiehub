const express = require("express");
const { Chat, User } = require("../../models");
const router = express.Router();
const passport = require("passport");
const { Op } = require("sequelize");

// Fetch chat messages between two users
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { sender_id, receiver_id } = req.query;
    try {
      const messages = await Chat.findAll({
        where: {
          [Op.or]: [
            { sender_id, receiver_id },
            { sender_id: receiver_id, receiver_id: sender_id },
          ],
        },
        order: [["timestamp", "ASC"]],
      });
      res.json(messages);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Save a new chat message
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { sender_id, receiver_id, message } = req.body;
    try {
      const newMessage = await Chat.create({
        sender_id,
        receiver_id,
        message,
      });
      res.json(newMessage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
