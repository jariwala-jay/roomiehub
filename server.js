const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const http = require("http");
const socketIo = require("socket.io");
const db = require("./models");
const { Chat } = require('./models');

const app = express();
const port = process.env.PORT || 5000;

const secretKey = "roomiehub";

app.use(bodyParser.json());
app.use(cors());

// Passport JWT Strategy
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

passport.use(
  new Strategy(opts, (jwt_payload, done) => {
    db.User.findByPk(jwt_payload.id)
      .then((user) => {
        if (user) {
          return done(null, user);
        }
        return done(null, false);
      })
      .catch((err) => done(err, false));
  })
);

app.use(passport.initialize());

const userRoutes = require("./api/users");
const authRoutes = require("./api/auth");
const requestRoutes = require("./api/requests");
const friendRoutes = require("./api/friends");
const chatRoutes = require("./api/chat");

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/chat", chatRoutes);

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000", // Update this with your frontend URL
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("sendMessage", async (message) => {
    // Save the message to the database
    const newMessage = await Chat.create(message);
    // Emit the message to the receiver
    io.emit("receiveMessage", newMessage);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

db.sequelize
  .sync()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
