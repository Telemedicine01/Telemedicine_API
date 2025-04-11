import { expressjwt } from "express-jwt";

export const auth = expressjwt({
  secret: process.env.JWT_SECRET_KEY,
  algorithms: ["HS256"],
});

export const isDoctor = (req, res, next) => {
  if (!req.auth || !req.auth.role.doctor) {
    return res.sendStatus(403);
  }
};

export const authorize = (roles = []) => {
  return (req, res, next) => {
    const userRole = req.auth.role; // Assuming req.user is populated with the logged-in user's data
    if (roles.length && !roles.includes(userRole)) {
      return res.status(403).json("Access denied: insufficient permissions");
    }

    next();
  };
};
