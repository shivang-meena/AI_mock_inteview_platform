import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded:string = jwt.verify(
      token,
      process.env.API_JWT_SECRET as string
    )as string;

    req.user = { userId: decoded };



    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}