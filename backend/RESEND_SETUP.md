# Resend Email Integration Setup

## Overview
This backend system sends email notifications to the business owner whenever a new quote request is submitted through the website.

## Flow
```
Customer submits form
        ↓
Lead saved in MongoDB (ycs database → leads collection)
        ↓
Email sent to yash.consys@gmail.com via Resend
        ↓
Success response returned to frontend
```

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Resend API Key
1. Go to https://resend.com
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the API key

### 3. Configure Environment Variables
Edit `backend/.env` file and add:
```
RESEND_API_KEY=re_your_actual_api_key_here
BUSINESS_EMAIL=yash.consys@gmail.com
```

### 4. Verify Domain (Production Only)
For production, you need to verify your domain in Resend:
- Development: Uses `onboarding@resend.dev` (no verification needed)
- Production: Add and verify your custom domain in Resend dashboard

### 5. Start Backend Server
```bash
npm run dev
```

## Email Notification Details

**Subject:** 🚀 New Quote Request Received

**Sent To:** yash.consys@gmail.com

**Content Includes:**
- Customer Name
- Company Name
- Phone Number
- Email Address
- Product Requirement
- Message
- Submission Timestamp

**Email Template:** Professional HTML email with branded styling

## Important Notes

✅ **Lead creation always succeeds** - Even if email fails, the lead is saved in MongoDB

✅ **Non-blocking** - Email is sent asynchronously and doesn't delay the API response

✅ **Error Handling** - Email failures are logged but don't affect lead submission

✅ **Graceful Degradation** - If RESEND_API_KEY is not configured, the system works without emails

## Files Created

**Backend Services:**
- `src/services/emailService.ts` - Reusable Resend email service
- `src/templates/quoteEmail.ts` - HTML email template

## Files Modified

- `backend/package.json` - Added Resend SDK dependency
- `backend/src/routes/leads.ts` - Added email trigger after MongoDB save
- `backend/.env` - Added RESEND_API_KEY and BUSINESS_EMAIL
- `backend/.env.example` - Updated with new environment variables

## Email Trigger Location

**File:** `backend/src/routes/leads.ts`
**Line:** After `db.collection('leads').insertOne(lead)`

```typescript
// Lead is saved first
const result = await db.collection('leads').insertOne(lead);

// Then email is sent (non-blocking)
emailService.sendQuoteNotification({...}).catch((error) => {
  console.error('Email failed, but lead was saved:', error);
});

// Response is sent immediately
res.status(201).json({ success: true });
```

## Testing

1. Submit a quote request from the website
2. Check MongoDB Atlas - Lead should be saved in `ycs` → `leads` collection
3. Check email at yash.consys@gmail.com - Should receive notification
4. Check backend logs for confirmation

## Troubleshooting

**Email not sending?**
- Verify RESEND_API_KEY is correct in `.env`
- Check backend logs for error messages
- Ensure Resend account is active
- For production, verify your domain in Resend

**Lead not saving?**
- Check MongoDB connection string
- Verify database name is `ycs`
- Check collection name is `leads`

## Environment Variables Required

```env
MONGODB_URI=mongodb+srv://...
PORT=3001
CORS_ORIGIN=http://localhost:5173
RESEND_API_KEY=re_xxxxxxxxxxxxx
BUSINESS_EMAIL=yash.consys@gmail.com
```
