import { z } from "zod";

export const LeadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(120),
  company: z.string().trim().min(1, "Company name is required").max(160),
  phone: z.string().trim().min(5, "Phone number is required").max(40),
  email: z.string().trim().email("Valid email is required").max(200),
  productRequirement: z.string().trim().min(1, "Product requirement is required").max(1000),
  message: z.string().trim().max(2000).optional().default(""),
  source: z.string().trim().max(120).optional().default("website"),
});

export type LeadInput = z.infer<typeof LeadSchema>;

export interface Lead extends LeadInput {
  status: "new" | "contacted" | "quoted" | "closed";
  createdAt: Date;
}
