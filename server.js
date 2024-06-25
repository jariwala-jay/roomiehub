const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const db = require("./models");

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
const completeRoutes = require("./api/register/complete");
const preferencesRoutes = require("./api/register/preferences");

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/register/complete", completeRoutes);
app.use("/api/register/preferences", preferencesRoutes);

db.sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
