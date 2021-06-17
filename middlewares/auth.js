const jwt = require("jsonwebtoken");
const User = require("../Users/users.model");

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("No autorizado - no token");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return res.status(401).send("Token no es válido");
  }
};

module.exports = auth;
