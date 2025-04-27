import { expressjwt } from "express-jwt";

// Middleware to check if token is valid
export const authDoctor = expressjwt({
  secret: process.env.JWT_SECRET_KEY,
  algorithms: ["HS256"],
});

// Middleware to check role
export const isDoctor = (req, res, next) => {
  if (!req.auth || req.auth.role !== "doctor") {
    return res.status(403).json("Access denied: Only doctors can access this resource.");
  }
  next();
};

// General authorization middleware
export const authorizeDoctor = (roles = []) => {
  return (req, res, next) => {
    const userRole = req.auth.role;
    if (roles.length && !roles.includes(userRole)) {
      return res.status(403).json("Access denied: insufficient permissions");
    }
    next();
  };
};
