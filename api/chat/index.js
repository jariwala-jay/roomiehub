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
    const { sender_id, receiver_id, message, is_read } = req.body;
    try {
      const newMessage = await Chat.create({
        sender_id,
        receiver_id,
        message,
        is_read,
      });
      res.json(newMessage);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Mark messages as read
router.post(
  "/markAsRead",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { sender_id, receiver_id } = req.body;
     console.log( sender_id + ' ' + receiver_id + "before try..." );
    try {
      console.log('executing api for isread update...');
      await Chat.update(
        { is_read: true },
        {
          where: {
            sender_id: sender_id,
            receiver_id: receiver_id,
            is_read: false,
          },
        }
      );
      console.log('after try...');
      res.json({ message: "Messages marked as read" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);


module.exports = router;
