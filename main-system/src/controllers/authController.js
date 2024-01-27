const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.users;
const jwt = require("jsonwebtoken");
require("dotenv").config();

let refreshTokens = [];

const authController = {
  // REGISTER
  registerUser: async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(req.body.password, salt);

      // Create new user
      let info = {
        Username: req.body.username,
        PasswordHash: hashed,
        FullName: null,
        Email: req.body.email,
        PhoneNumber: null,
        isAdmin: false,
        AuthenticationType: null,
        AuthProviderID: null,
        AuthProviderToken: null,
        DateCreated: new Date(),
      };

      // Check if user exists
      const userExists = await User.findOne({
        where: {
          Username: req.body.username,
        },
      });

      if (userExists) {
        return res
          .status(400)
          .json({
            responseText: "Tài khoản đã tồn tại, vui lòng nhập tài khoản khác.",
          });
      }

      const emailExists = await User.findOne({
        where: {
          Email: req.body.email,
        },
      });

      if (emailExists) {
        return res
          .status(400)
          .json({
            responseText: "Email đã tồn tại, vui lòng nhập email khác.",
          });
      }

      // Save user
      const user = await User.create(info);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  generateAccessToken: (user) => {
    return jwt.sign(
      {
        username: user.Username,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_ACCESS_KEY,
      { expiresIn: "2h" }
    );
  },

  generateRefreshToken: (user) => {
    return jwt.sign(
      {
        id: user.id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "365d" }
    );
  },

  // LOGIN
  loginUser: async (req, res) => {
    try {
      // Check if user exists
      const user = await User.findOne({
        where: {
          Username: req.body.username,
        },
      });

      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      // Check if password is correct
      const validPass = await bcrypt.compare(
        req.body.password,
        user.PasswordHash
      );

      if (!validPass) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const accessToken = authController.generateAccessToken(user);

      const refreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(refreshToken);

      //STORE REFRESH TOKEN IN COOKIE
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      const { PasswordHash, ...info } = user.dataValues;

      res.status(200).json({ ...info });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // LOGIN ADMIN
  loginAdmin: async (req, res) => {
    console.log(req.body);
    try {
      // Check if user exists
      const user = await User.findOne({
        where: {
          Username: req.body.username,
          isAdmin: true,
        },
      });

      if (!user) {
        return res.status(400).json({ message: "User does not exist" });
      }

      // Check if password is correct
      const validPass = await bcrypt.compare(
        req.body.password,
        user.PasswordHash
      );

      if (!validPass) {
        return res.status(400).json({ message: "Invalid password" });
      }

      if (!user.isAdmin) {
        return res.status(400).json({ message: "User is not admin" });
      }

      const accessToken = authController.generateAccessToken(user);

      const refreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(refreshToken);

      //STORE REFRESH TOKEN IN COOKIE
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });

      const { PasswordHash, ...info } = user.dataValues;

      res.status(200).json({ ...info });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // REFRESH TOKEN
  requestRefreshToken: async (req, res) => {
    //Take refresh token from user
    const refreshToken = req.cookies.refreshToken;
    //Send error if token is not valid
    if (!refreshToken) return res.status(401).json("You're not authenticated");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid");
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
      if (err) {
        console.log(err);
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      //create new access token, refresh token and send to user
      const newAccessToken = authController.generateAccessToken(user);
      const newRefreshToken = authController.generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  },

  // LOGOUT
  logOut: async (req, res) => {
    //Clear cookies when user logs out
    refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
    res.clearCookie("refreshToken");
    res.status(200).json("Logged out successfully!");
  },
};

module.exports = authController;
