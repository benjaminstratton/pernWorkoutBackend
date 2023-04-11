const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    // Get the token from the header
    const jwtToken = req.header("token");
    // Check for token
    if (!jwtToken) {
      return res.status(403).json({ msg: "Authorization denied" });
    }
    // Verify token
    const verify = jwt.verify(jwtToken, process.env.JWTSECRET);
    // Add to the user
    req.user = verify.user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(403).json({ msg: "Authorization denied" });
  }
};
