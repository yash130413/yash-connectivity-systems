import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getDatabase } from '../db/connection.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { loginRateLimiter } from '../middleware/rateLimit.js';
import { isAdminSeedAllowed } from '../config/env.js';
import { Admin } from '../models/Admin.js';

const router = Router();

// POST /api/admin/login
router.post('/login', loginRateLimiter, async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required.' });
      return;
    }

    const db = getDatabase();
    const admin = await db.collection<Admin>('admins').findOne({ email: email.toLowerCase().trim() });

    if (!admin) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const isValid = await bcrypt.compare(password, admin.passwordHash);
    if (!isValid) {
      res.status(401).json({ success: false, message: 'Invalid email or password.' });
      return;
    }

    const token = jwt.sign(
      { email: admin.email, role: admin.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '24h' }
    );

    console.log('✅ Admin login');
    res.json({ success: true, token, admin: { email: admin.email, role: admin.role } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// GET /api/admin/me - verify token & return admin info
router.get('/me', authMiddleware, (req: AuthRequest, res: Response) => {
  res.json({ success: true, admin: req.admin });
});

// POST /api/admin/seed - create first admin (requires ALLOW_ADMIN_SEED=true)
router.post('/seed', async (req: Request, res: Response) => {
  if (!isAdminSeedAllowed()) {
    res.status(403).json({ success: false, message: 'Admin seeding is disabled.' });
    return;
  }

  try {
    const db = getDatabase();
    const existing = await db.collection('admins').findOne({});

    if (existing) {
      res.status(400).json({ success: false, message: 'Admin already exists.' });
      return;
    }

    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ success: false, message: 'Email and password are required.' });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const admin: Admin = {
      email: email.toLowerCase().trim(),
      passwordHash,
      role: 'superadmin',
      createdAt: new Date(),
    };

    await db.collection('admins').insertOne(admin);
    console.log('✅ Admin created:', admin.email);
    res.status(201).json({ success: true, message: 'Admin created successfully.' });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

export default router;
