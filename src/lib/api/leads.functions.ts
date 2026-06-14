import { z } from "zod";
import { API_URL } from '@/lib/config/api';

const LeadSchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().min(1).max(160),
  phone: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(200),
  requirement: z.string().trim().min(1).max(1000),
  message: z.string().trim().max(2000).optional().default(""),
  source: z.string().trim().max(120).optional().default("website"),
});

export type LeadInput = z.infer<typeof LeadSchema>;

export async function submitLead(data: LeadInput) {
  const payload = {
    name: data.name,
    company: data.company,
    phone: data.phone,
    email: data.email,
    productRequirement: data.requirement,
    message: data.message || '',
    source: data.source || 'website',
  };

  try {
    const res = await fetch(`${API_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to submit lead');
    }

    return await res.json();
  } catch (error) {
    console.error('[submitLead] Error:', error);
    throw error;
  }
}
