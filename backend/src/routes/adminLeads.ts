import { Router, Response } from 'express';
import { getDatabase } from '../db/connection.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';
import { parsePagination } from '../utils/pagination.js';
import { parseObjectId } from '../utils/objectId.js';

const router = Router();

// All routes protected
router.use(authMiddleware);

// GET /api/admin/leads
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDatabase();
    const { status, page, limit } = req.query;
    const { page: pageNum, limit: limitNum, skip } = parsePagination(
      page as string | undefined,
      limit as string | undefined,
    );

    const filter: Record<string, string> = {};
    if (status && typeof status === 'string') filter.status = status;

    const [leads, total] = await Promise.all([
      db.collection('leads')
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .toArray(),
      db.collection('leads').countDocuments(filter),
    ]);

    res.json({ success: true, leads, total, page: pageNum, limit: limitNum });
  } catch (error) {
    console.error('Fetch leads error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch leads.' });
  }
});

// PATCH /api/admin/leads/:id/status
router.patch('/:id/status', async (req: AuthRequest, res: Response) => {
  const objectId = parseObjectId(req.params.id, res);
  if (!objectId) return;

  try {
    const db = getDatabase();
    const { status } = req.body;

    const validStatuses = ['new', 'contacted', 'quoted', 'closed'];
    if (!validStatuses.includes(status)) {
      res.status(400).json({ success: false, message: 'Invalid status.' });
      return;
    }

    await db.collection('leads').updateOne(
      { _id: objectId },
      { $set: { status } }
    );

    res.json({ success: true, message: 'Status updated.' });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ success: false, message: 'Failed to update status.' });
  }
});

export default router;
