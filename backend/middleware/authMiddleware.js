const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  // header se token lo
  const authHeader = req.headers.authorization;

  // agar token nahi hai
  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {

    // token format hota hai: Bearer token
    const token = authHeader.split(" ")[1];

    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // user info request me attach kar do
    req.user = decoded;

    // next API ko allow karo
    next();

  } catch (error) {

    res.status(401).json({ message: "Invalid token" });

  }
};

module.exports = authMiddleware;