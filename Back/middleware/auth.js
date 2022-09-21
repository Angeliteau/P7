const jwt = require("jsonwebtoken");
require("dotenv").config();

//////////// VERIFICATION DU COOKIE JWT ////////////
module.exports = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res
      .status(401)
      .json("Merci de bien vouloir vous connectez pour consulter les posts !");
  }
};
