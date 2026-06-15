import { Resend } from 'resend';
import { generateQuoteEmailTemplate, EmailTemplateData } from '../templates/quoteEmail.js';
import { generateCustomerConfirmationTemplate } from '../templates/customerConfirmationEmail.js';

export interface SendQuoteNotificationParams {
  name: string;
  company: string;
  phone: string;
  email: string;
  productRequirement: string;
  message: string;
  submittedAt: Date;
}

class EmailService {
  private resend: Resend | null = null;
  private businessEmail: string = '';
  private fromEmail: string = '';
  private isConfigured: boolean = false;
  private initialized: boolean = false;

  private initialize() {
    if (this.initialized) return;

    const apiKey = process.env.RESEND_API_KEY;
    this.businessEmail = process.env.BUSINESS_EMAIL || 'yash.consys@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    this.fromEmail = fromEmail
      ? fromEmail
      : 'Yash Connectivity Systems <onboarding@resend.dev>';
    console.log('📤 Sending emails from:', this.fromEmail);

    if (apiKey) {
      this.resend = new Resend(apiKey);
      this.isConfigured = true;
      console.log('✅ Resend email service configured');
      console.log('✉️  Notifications will be sent to:', this.businessEmail);
    } else {
      console.warn('⚠️  RESEND_API_KEY not configured. Email notifications will be disabled.');
    }

    this.initialized = true;
  }

  async sendQuoteNotification(params: SendQuoteNotificationParams): Promise<void> {
    this.initialize();

    if (!this.isConfigured || !this.resend) {
      console.warn('⚠️  Email service not configured. Skipping email notification.');
      return;
    }

    const submittedAtFormatted = params.submittedAt.toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    });

    // Send both emails in parallel
    const [businessResult, customerResult] = await Promise.allSettled([
      // Email 1: Business owner notification
      this.resend.emails.send({
        from: this.fromEmail,
        to: [this.businessEmail],
        subject: '🚀 New Quote Request Received',
        html: generateQuoteEmailTemplate({
          name: params.name,
          company: params.company,
          phone: params.phone,
          email: params.email,
          productRequirement: params.productRequirement,
          message: params.message || 'No additional message provided.',
          submittedAt: submittedAtFormatted,
        } as EmailTemplateData),
        reply_to: params.email,
      }),

      // Email 2: Customer confirmation
      this.resend.emails.send({
        from: this.fromEmail,
        to: [params.email],
        subject: '✅ We received your quote request!',
        html: generateCustomerConfirmationTemplate({
          name: params.name,
          company: params.company,
          productRequirement: params.productRequirement,
          submittedAt: submittedAtFormatted,
        }),
        reply_to: this.businessEmail,
      }),
    ]);

    if (businessResult.status === 'fulfilled' && !businessResult.value.error) {
      console.log('✅ Business notification email sent successfully');
    } else {
      console.error('❌ Business notification email failed:', businessResult.status === 'rejected' ? businessResult.reason : businessResult.value.error);
    }

    if (customerResult.status === 'fulfilled' && !customerResult.value.error) {
      console.log('✅ Customer confirmation email sent successfully');
    } else {
      console.error('❌ Customer confirmation email failed:', customerResult.status === 'rejected' ? customerResult.reason : customerResult.value.error);
    }
  }
}

export const emailService = new EmailService();
