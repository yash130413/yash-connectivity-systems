import { Router, Request, Response } from 'express';
import { getDatabase } from '../db/connection.js';
import { LeadSchema, Lead } from '../models/Lead.js';
import { emailService } from '../services/emailService.js';
import { leadsRateLimiter } from '../middleware/rateLimit.js';
import { z } from 'zod';

const router = Router();

router.post('/leads', leadsRateLimiter, async (req: Request, res: Response) => {
  try {
    const validatedData = LeadSchema.parse(req.body);

    const lead: Lead = {
      ...validatedData,
      productRequirement: validatedData.productRequirement,
      status: 'new',
      createdAt: new Date(),
    };

    const db = getDatabase();
    const result = await db.collection('leads').insertOne(lead);

    console.log('✅ Lead saved to MongoDB');

    // Send email notification (non-blocking)
    emailService.sendQuoteNotification({
      name: lead.name,
      company: lead.company,
      phone: lead.phone,
      email: lead.email,
      productRequirement: lead.productRequirement,
      message: lead.message || '',
      submittedAt: lead.createdAt,
    }).catch((error) => {
      console.error('⚠️  Email notification failed, but lead was saved');
    });

    res.status(201).json({
      success: true,
      message: 'Lead submitted successfully',
      id: result.insertedId,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors,
      });
      return;
    }

    console.error('Error saving lead:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit lead. Please try again.',
    });
  }
});

export default router;
