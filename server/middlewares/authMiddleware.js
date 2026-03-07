const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    //get the token from header  
     const token = req.header("authorization").split(" ")[1];
     //decode the token
     const decryptedToken = jwt.verify(token, process.env.jwt_secret);
     req.body.userId = decryptedToken.userId;
     next();
  } catch (error) {
    res.send({
      sucess: false,
      message: error.message,
    });
  }
};
