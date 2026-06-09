import { Router, Response } from 'express';
import { getDatabase } from '../db/connection.js';
import { authMiddleware, AuthRequest } from '../middleware/auth.js';

const router = Router();
router.use(authMiddleware);

// GET /api/admin/analytics?from=ISO&to=ISO
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    const db = getDatabase();
    const leads = db.collection('leads');

    const now = new Date();

    // Date range from query params (default: last 30 days)
    const to = req.query.to ? new Date(req.query.to as string) : new Date();
    const from = req.query.from
      ? new Date(req.query.from as string)
      : new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    to.setHours(23, 59, 59, 999);
    from.setHours(0, 0, 0, 0);

    const todayStart = new Date(now);
    todayStart.setHours(0, 0, 0, 0);

    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 7);
    weekStart.setHours(0, 0, 0, 0);

    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // ── 1. Overview counts ──────────────────────────────────────────────
    const [total, todayCount, weekCount, monthCount, statusDist] = await Promise.all([
      leads.countDocuments(),
      leads.countDocuments({ createdAt: { $gte: todayStart } }),
      leads.countDocuments({ createdAt: { $gte: weekStart } }),
      leads.countDocuments({ createdAt: { $gte: monthStart } }),

      // Status distribution (all time)
      leads.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]).toArray(),
    ]);

    const closed = statusDist.find((s) => s._id === 'closed')?.count || 0;
    const conversionRate = total > 0 ? Math.round((closed / total) * 100) : 0;

    // ── 2. Daily trend (within date range) ──────────────────────────────
    const dailyTrend = await leads.aggregate([
      { $match: { createdAt: { $gte: from, $lte: to } } },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { date: '$_id', count: 1, _id: 0 } },
    ]).toArray();

    // ── 3. Product inquiry analytics ────────────────────────────────────
    const productInquiries = await leads.aggregate([
      { $match: { createdAt: { $gte: from, $lte: to } } },
      {
        $addFields: {
          productLower: { $toLower: '$productRequirement' },
        },
      },
      {
        $group: {
          _id: {
            $switch: {
              branches: [
                { case: { $regexMatch: { input: '$productLower', regex: /barcode|label/ } }, then: 'Barcode Labels' },
                { case: { $regexMatch: { input: '$productLower', regex: /ribbon|thermal/ } }, then: 'Thermal Ribbons' },
                { case: { $regexMatch: { input: '$productLower', regex: /cable.?tie|tie/ } }, then: 'Cable Ties' },
                { case: { $regexMatch: { input: '$productLower', regex: /heat.?shrink|shrink|sleeve/ } }, then: 'Heat Shrink Sleeves' },
                { case: { $regexMatch: { input: '$productLower', regex: /pack|carton|tape|bubble/ } }, then: 'Packing Materials' },
                { case: { $regexMatch: { input: '$productLower', regex: /connector|terminal|lug/ } }, then: 'Insulated Connectors' },
                { case: { $regexMatch: { input: '$productLower', regex: /conduit|pipe/ } }, then: 'Conduit Plastics' },
              ],
              default: 'Other',
            },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $project: { product: '$_id', count: 1, _id: 0 } },
    ]).toArray();

    // ── 4. Top companies ─────────────────────────────────────────────────
    const topCompanies = await leads.aggregate([
      { $match: { createdAt: { $gte: from, $lte: to } } },
      { $group: { _id: '$company', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 8 },
      { $project: { company: '$_id', count: 1, _id: 0 } },
    ]).toArray();

    // ── 5. Recent activity (last 10) ─────────────────────────────────────
    const recentActivity = await leads.find(
      {},
      { projection: { name: 1, company: 1, productRequirement: 1, status: 1, createdAt: 1 } }
    ).sort({ createdAt: -1 }).limit(10).toArray();

    // ── 6. Weekly breakdown ──────────────────────────────────────────────
    const weeklyTrend = await leads.aggregate([
      { $match: { createdAt: { $gte: from, $lte: to } } },
      {
        $group: {
          _id: { $isoWeek: '$createdAt' },
          year: { $first: { $isoWeekYear: '$createdAt' } },
          count: { $sum: 1 },
          weekStart: { $min: '$createdAt' },
        },
      },
      { $sort: { year: 1, _id: 1 } },
      { $project: { week: '$_id', year: 1, count: 1, weekStart: 1, _id: 0 } },
    ]).toArray();

    res.json({
      success: true,
      overview: {
        total,
        today: todayCount,
        thisWeek: weekCount,
        thisMonth: monthCount,
        converted: closed,
        pending: (statusDist.find((s) => s._id === 'new')?.count || 0) +
                 (statusDist.find((s) => s._id === 'contacted')?.count || 0),
        conversionRate,
      },
      statusDistribution: statusDist.map((s) => ({
        status: s._id,
        count: s.count,
        percentage: total > 0 ? Math.round((s.count / total) * 100) : 0,
      })),
      dailyTrend,
      weeklyTrend,
      productInquiries,
      topCompanies,
      recentActivity,
      dateRange: { from: from.toISOString(), to: to.toISOString() },
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch analytics.' });
  }
});

export default router;
