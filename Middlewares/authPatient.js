import { expressjwt } from "express-jwt";

// Middleware to check if token is valid
export const authPatient = expressjwt({
  secret: process.env.JWT_SECRET_KEY, // use your JWT_SECRET from env
  algorithms: ["HS256"],
});
// Middleware to check if the logged-in user is a "patient"
export const isPatient = (req, res, next) => {
  if (!req.auth || req.auth.role !== "patient") {
    return res.status(403).json("Access denied: Only patients can access this resource.");
  }
  next();
};

// General role-based authorization middleware
export const authorizePatient = (roles = []) => {
  return (req, res, next) => {
    const userRole = req.auth.role; 
    if (roles.length && !roles.includes(userRole)) {
      return res.status(403).json("Access denied: insufficient permissions");
    }
    next();
  };
};