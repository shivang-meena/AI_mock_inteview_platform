import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string
}

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string };
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(
      token,
      process.env.API_JWT_SECRET as string
    )as TokenPayload;

    req.user={ userId: decoded.userId };
 console.log(req.user.userId);
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}