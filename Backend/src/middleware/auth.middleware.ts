import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserRole } from "../models/user.model";

//extending express request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "Authorization token not provided" });
    } else {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "your_jwt_secret"
      );
      req.user = decoded;
      next();
    }
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token', error });
  }
};

export const authorize = (roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: 'User not authenticated' });
    } else if (!roles.includes(req.user.role)) {
      res.status(403).json({ message: 'Access forbidden: insufficient permissions' });
    } else {
      next();
    }
  }; 
};