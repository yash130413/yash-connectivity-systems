export interface EmailTemplateData {
  name: string;
  company: string;
  phone: string;
  email: string;
  productRequirement: string;
  message: string;
  submittedAt: string;
}

export function generateQuoteEmailTemplate(data: EmailTemplateData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Quote Request</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1A2E6B 0%, #2A4A8F 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">
                🚀 New Quote Request Received
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 24px 0; color: #666666; font-size: 15px; line-height: 1.6;">
                You have received a new quote request from your website. Here are the details:
              </p>

              <!-- Details Table -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border: 1px solid #e5e5e5; border-radius: 8px; overflow: hidden;">
                
                <tr>
                  <td style="padding: 16px 20px; background-color: #f9fafb; border-bottom: 1px solid #e5e5e5; width: 40%; font-weight: 600; color: #1A2E6B; font-size: 14px;">
                    Name:
                  </td>
                  <td style="padding: 16px 20px; background-color: #ffffff; border-bottom: 1px solid #e5e5e5; color: #333333; font-size: 14px;">
                    ${data.name}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 16px 20px; background-color: #f9fafb; border-bottom: 1px solid #e5e5e5; font-weight: 600; color: #1A2E6B; font-size: 14px;">
                    Company:
                  </td>
                  <td style="padding: 16px 20px; background-color: #ffffff; border-bottom: 1px solid #e5e5e5; color: #333333; font-size: 14px;">
                    ${data.company}
                  </td>
                </tr>

                <tr>
                  <td style="padding: 16px 20px; background-color: #f9fafb; border-bottom: 1px solid #e5e5e5; font-weight: 600; color: #1A2E6B; font-size: 14px;">
                    Phone:
                  </td>
                  <td style="padding: 16px 20px; background-color: #ffffff; border-bottom: 1px solid #e5e5e5; color: #333333; font-size: 14px;">
                    <a href="tel:${data.phone}" style="color: #F59E0B; text-decoration: none;">${data.phone}</a>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 16px 20px; background-color: #f9fafb; border-bottom: 1px solid #e5e5e5; font-weight: 600; color: #1A2E6B; font-size: 14px;">
                    Email:
                  </td>
                  <td style="padding: 16px 20px; background-color: #ffffff; border-bottom: 1px solid #e5e5e5; color: #333333; font-size: 14px;">
                    <a href="mailto:${data.email}" style="color: #F59E0B; text-decoration: none;">${data.email}</a>
                  </td>
                </tr>

                <tr>
                  <td style="padding: 16px 20px; background-color: #f9fafb; border-bottom: 1px solid #e5e5e5; font-weight: 600; color: #1A2E6B; font-size: 14px; vertical-align: top;">
                    Product Requirement:
                  </td>
                  <td style="padding: 16px 20px; background-color: #ffffff; border-bottom: 1px solid #e5e5e5; color: #333333; font-size: 14px;">
                    ${data.productRequirement}
                  </td>
                </tr>

                ${data.message ? `
                <tr>
                  <td style="padding: 16px 20px; background-color: #f9fafb; border-bottom: 1px solid #e5e5e5; font-weight: 600; color: #1A2E6B; font-size: 14px; vertical-align: top;">
                    Message:
                  </td>
                  <td style="padding: 16px 20px; background-color: #ffffff; border-bottom: 1px solid #e5e5e5; color: #333333; font-size: 14px; line-height: 1.6;">
                    ${data.message}
                  </td>
                </tr>
                ` : ''}

                <tr>
                  <td style="padding: 16px 20px; background-color: #f9fafb; font-weight: 600; color: #1A2E6B; font-size: 14px;">
                    Submitted At:
                  </td>
                  <td style="padding: 16px 20px; background-color: #ffffff; color: #666666; font-size: 14px;">
                    ${data.submittedAt}
                  </td>
                </tr>

              </table>

              <!-- CTA Button -->
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="margin-top: 32px;">
                <tr>
                  <td align="center">
                    <a href="mailto:${data.email}" style="display: inline-block; padding: 14px 32px; background-color: #F59E0B; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);">
                      Reply to Customer
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-top: 1px solid #e5e5e5; text-align: center;">
              <p style="margin: 0; color: #999999; font-size: 13px; line-height: 1.6;">
                This is an automated notification from your Yash Connectivity Systems website.<br>
                Please respond to the customer within 2 business hours.
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
