const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const access_token = req.headers["x-access-token"];
  const refresh_token = req.headers["x-refresh-token"];

  if (!access_token) {
    return res.status(511).send("A token is required for authentication");
  }
  try {
    const decoded_access = jwt.verify(access_token, config.TOKEN_KEY);
    const decoded_refresh = jwt.verify(refresh_token, config.TOKEN_KEY);
  } catch (err) {
    return res.status(401).send(err);
  }
  return next();
};

module.exports = verifyToken;