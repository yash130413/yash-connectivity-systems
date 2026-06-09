export interface CustomerEmailTemplateData {
  name: string;
  company: string;
  productRequirement: string;
  submittedAt: string;
}

export function generateCustomerConfirmationTemplate(data: CustomerEmailTemplateData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quote Request Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); overflow: hidden;">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                ✅ Quote Request Received!
              </h1>
              <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 15px;">
                Thank you for reaching out to us.
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">

              <p style="margin: 0 0 8px 0; font-size: 16px; color: #333333;">
                Dear <strong>${data.name}</strong>,
              </p>
              <p style="margin: 0 0 28px 0; font-size: 15px; color: #666666; line-height: 1.7;">
                We have successfully received your quote request. Our sales team will review your requirement and get back to you within <strong style="color: #1A2E6B;">2 business hours</strong> with pricing, MOQs and lead times.
              </p>

              <!-- Summary Box -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f9fafb; border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden; margin-bottom: 28px;">
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e5e5e5;">
                    <p style="margin: 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: #999999;">Your Submission Summary</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e5e5e5;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; color: #999999; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">Company</p>
                    <p style="margin: 0; font-size: 15px; color: #333333;">${data.company}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px; border-bottom: 1px solid #e5e5e5;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; color: #999999; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">Product Requirement</p>
                    <p style="margin: 0; font-size: 15px; color: #333333;">${data.productRequirement}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 20px;">
                    <p style="margin: 0 0 4px 0; font-size: 12px; color: #999999; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;">Submitted At</p>
                    <p style="margin: 0; font-size: 15px; color: #333333;">${data.submittedAt}</p>
                  </td>
                </tr>
              </table>

              <!-- What Happens Next -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px;">
                <tr>
                  <td>
                    <p style="margin: 0 0 16px 0; font-size: 15px; font-weight: 600; color: #1A2E6B;">What happens next?</p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="padding: 10px 0; vertical-align: top;">
                          <span style="display: inline-block; width: 28px; height: 28px; background-color: #1A2E6B; color: white; border-radius: 50%; text-align: center; line-height: 28px; font-size: 13px; font-weight: 700; margin-right: 12px;">1</span>
                          <span style="font-size: 14px; color: #555555; line-height: 28px;">Our team reviews your product requirement</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; vertical-align: top;">
                          <span style="display: inline-block; width: 28px; height: 28px; background-color: #1A2E6B; color: white; border-radius: 50%; text-align: center; line-height: 28px; font-size: 13px; font-weight: 700; margin-right: 12px;">2</span>
                          <span style="font-size: 14px; color: #555555; line-height: 28px;">We prepare pricing, MOQs and lead times</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 10px 0; vertical-align: top;">
                          <span style="display: inline-block; width: 28px; height: 28px; background-color: #1A2E6B; color: white; border-radius: 50%; text-align: center; line-height: 28px; font-size: 13px; font-weight: 700; margin-right: 12px;">3</span>
                          <span style="font-size: 14px; color: #555555; line-height: 28px;">You receive a detailed quote within 2 business hours</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Need Help -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background: linear-gradient(135deg, #f0f4ff 0%, #fef9ec 100%); border-radius: 8px; border: 1px solid #e5e5e5;">
                <tr>
                  <td style="padding: 20px 24px;">
                    <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600; color: #1A2E6B;">Need to reach us sooner?</p>
                    <p style="margin: 0; font-size: 13px; color: #666666; line-height: 1.6;">
                      📞 Call us: <a href="tel:9015669917" style="color: #F59E0B; text-decoration: none; font-weight: 600;">9015669917</a><br>
                      ✉️ Email us: <a href="mailto:yash.consys@gmail.com" style="color: #F59E0B; text-decoration: none; font-weight: 600;">yash.consys@gmail.com</a>
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #1A2E6B; text-align: center;">
              <p style="margin: 0 0 6px 0; color: rgba(255,255,255,0.9); font-size: 14px; font-weight: 600;">Yash Connectivity Systems</p>
              <p style="margin: 0; color: rgba(255,255,255,0.6); font-size: 12px; line-height: 1.6;">
                2880, Lane-4, Laxman Vihar, Phase-2, Gurugram – 122001<br>
                Industrial Labeling · Packaging · Connectivity
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
