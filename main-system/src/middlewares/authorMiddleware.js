const jwt = require("jsonwebtoken");

const authorMiddleware = {
  // verify token
  //   verifyToken: (req, res, next) => {
  //     const accessToken = req.cookies.accessToken;
  //     if (accessToken) {
  //       jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
  //         if (err) return res.status(403).json(err);
  //         req.user = user;
  //         next();
  //       });
  //     } else {
  //       console.log("You are not authenticated!");
  //       return res.status(401).json("You are not authenticated!");
  //     }
  //   },

  //TODO: verify token
  verifyToken: (req, res, next) => {
    next();
  },

  verifyTokenAndAdminAuth: (req, res, next) => {
    authorMiddleware.verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        console.log("You are not authorized!");
        return res.status(403).json("You are not authorized!");
      }
    });
  },
};

module.exports = authorMiddleware;
