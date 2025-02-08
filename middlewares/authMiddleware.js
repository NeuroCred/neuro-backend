import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  
  if (!token) {
    return res.status(401).json({ success: false, message: "Access Denied. No token provided." });
  }

  try {
    const tokenParts = token.split(" ");
    
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(400).json({ success: false, message: "Invalid token format. Use 'Bearer <token>'" });
    }

    const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);
    
    if (!decoded || !decoded.userId) {
      return res.status(401).json({ success: false, message: "Invalid Token. User not found." });
    }

    req.user = { id: decoded.userId };  // Ensure req.user is structured correctly
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid Token", error: error.message });
  }
};

export default authMiddleware;
