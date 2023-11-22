const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  var token = req.headers.authorization;
  token = token.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, "adsfasdfjkh$#asdfasdf.adsfxc", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }
    req.user = decoded;
    next();
  });
}

module.exports = validateToken;
