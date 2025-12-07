import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: ('admin' | 'customer')[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized"
        });
      }

      const token = authHeader.split(" ")[1]!;
      
      const decoded = jwt.verify(
        token,
        config.jwtSecret as string
      ) as JwtPayload;
      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          error: "Forbidden",
        });
      }

      next();
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };
};

export default auth;