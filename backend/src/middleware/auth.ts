import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AdminPayload } from '../models/Admin.js';

export interface AuthRequest extends Request {
  admin?: AdminPayload;
}

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    return;
  }

  try {
    const secret = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secret) as AdminPayload;
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
}
