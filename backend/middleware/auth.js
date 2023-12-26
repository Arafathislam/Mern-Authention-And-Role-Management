var jwt = require('jsonwebtoken');
var UserModel = require('../core/services/user/userModel.js');

var checkUserAuth = async (req, res, next) => {
  try {
    let token;
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];

      if (token) {
        try {
          // Verify the token
          const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);

          // Get user from token
          req.user = await UserModel.findById(userId).select("-password");
          // console.log("req",req.user);
          if(req.user){
            next();
          }

        } catch (error) {
          // console.log(error)
          res.status(401).send({
            status: "failed",
            message: "Unauthorized User (Token Verification Failed)",
          });
        }
      } else {
        res.status(401).send({
          status: "failed",
          message: "Unauthorized User and no token",
        });
      }
    } else {
      res.status(401).send({ status: "failed", message: "Unauthorized User" });
    }
  } catch (err) {
    console.error("Internal server error:", err);
    res.status(500).send({ status: "error", message: "Internal Server Error" });
  }
};

module.exports = checkUserAuth;