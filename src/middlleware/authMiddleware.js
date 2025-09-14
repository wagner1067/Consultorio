import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Invalid token format" });
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
