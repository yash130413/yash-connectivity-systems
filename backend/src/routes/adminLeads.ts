import { Router, Response } from 'express';
import { getDatabase } from '../db/connection.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();

// All routes protected
router.use(authMiddleware);

// GET /api/admin/leads
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDatabase();
    const { status, page = '1', limit = '20' } = req.query;

    const filter: Record<string, string> = {};
    if (status && typeof status === 'string') filter.status = status;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);

    const [leads, total] = await Promise.all([
      db.collection('leads')
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parseInt(limit as string))
        .toArray(),
      db.collection('leads').countDocuments(filter),
    ]);

    res.json({ success: true, leads, total, page: parseInt(page as string), limit: parseInt(limit as string) });
  } catch (error) {
    console.error('Fetch leads error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch leads.' });
  }
});

// PATCH /api/admin/leads/:id/status
router.patch('/:id/status', async (req: AuthRequest, res: Response) => {
  try {
    const { ObjectId } = await import('mongodb');
    const db = getDatabase();
    const { status } = req.body;

    const validStatuses = ['new', 'contacted', 'quoted', 'closed'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid status.' });
      return;
    }

    await db.collection('leads').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { status } }
    );

    res.json({ success: true, message: 'Status updated.' });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ success: false, message: 'Failed to update status.' });
  }
});

export default router;
