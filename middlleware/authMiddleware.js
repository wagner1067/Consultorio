import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, "your_secret_key");
    req.doctorId = decoded.doctorId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token!" });
  }
}

export default verifyToken;
