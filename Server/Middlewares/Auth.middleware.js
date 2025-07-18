import jwt from "jsonwebtoken";
import Users from "../Models/User.module.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unathorized - No Token Provided" });  
    }
    const decoded = jwt.verify(token, process.env.JWT_PASS);
    if (!decoded) {
      return res.status(401).json({ message: "Unathorized - Inavalid Token" });
    }
    const user = await Users.findById(decoded.UserId).select(
      "username email profilePicture bio"
    );
    if (!user) {
      return res.status(404).json({ message: "user Not Found" });
    }
    req.user = user;
    next();
  } catch (error ) {
    console.log("Error in protectRoute middleware", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
