const passport = require("passport");
require("dotenv").config();
var GoogleStrategy = require("passport-google-oauth2").Strategy;

const db = require("../models");
const User = db.users;
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://localhost:3000/auth/google/callback",
      passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists
        const userExists = await User.findOne({
          where: {
            Email: profile.emails[0].value,
          },
        });
        if (userExists) {
          return done(null, userExists);
        } else {
          let info = {
            Username: profile.displayName,
            PasswordHash: "",
            FullName: profile.displayName,
            Email: profile.emails[0].value,
            PhoneNumber: null,
            isAdmin: false,
            AuthenticationType: null,
            AuthProviderID: null,
            AuthProviderToken: null,
            DateCreated: new Date(),
          };
          const user = await User.create(info);

          return done(null, user);
        }
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
