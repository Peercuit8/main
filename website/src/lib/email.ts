import nodemailer from 'nodemailer';
import { ApplicationInput } from "./schema";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL || 'peercuit8@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const SENDER_EMAIL = `"Peercuit Community" <${process.env.GMAIL_EMAIL || "peercuit8@gmail.com"}>`;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || process.env.NOTIFICATION_EMAIL || process.env.GMAIL_EMAIL || "peercuit8@gmail.com";

interface EmailResult {
  success: boolean;
  messageId?: string;
  simulated?: boolean;
  error?: string;
}

/**
 * Sends notification email to the community admin team
 * and an optional confirmation email to the applicant.
 */
export async function sendApplicationNotification(
  data: ApplicationInput
): Promise<EmailResult> {
  if (!process.env.GMAIL_APP_PASSWORD) {
    console.log("[Email Service] GMAIL_APP_PASSWORD is not set. Simulating email notification for:", data.email);
    console.log(`[Email Preview to Admin: ${ADMIN_EMAIL}]
--------------------------------------------------
New Application Received:
Name: ${data.fullName}
Email: ${data.email}
School: ${data.school} (${data.grade})
Location: ${data.location}
Age: ${data.age || "N/A"}
Referral: ${data.referral}
Portfolio: ${data.portfolioLink || "None provided"}

Current Work:
${data.currentWork}

Why Peercuit:
${data.whyJoin}
--------------------------------------------------`);
    return { success: true, simulated: true };
  }

  try {
    // 1. Send Admin Notification
    const adminEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050806; color: #f3f4f6; margin: 0; padding: 24px; }
    .card { background-color: #0b140f; border: 1px solid #14532d; border-radius: 12px; max-width: 600px; margin: 0 auto; overflow: hidden; }
    .header { background: linear-gradient(135deg, #064e3b, #059669); padding: 24px; color: white; }
    .header h1 { margin: 0 0 6px 0; font-size: 20px; font-weight: 800; letter-spacing: 0.05em; }
    .header p { margin: 0; font-size: 14px; opacity: 0.95; }
    .content { padding: 24px; }
    .field-group { margin-bottom: 18px; }
    .label { font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #6ee7b7; margin-bottom: 4px; font-weight: 700; }
    .value { font-size: 15px; color: #ffffff; font-weight: 500; }
    .box { background-color: #13241b; border-radius: 8px; padding: 14px; margin-top: 6px; font-size: 14px; line-height: 1.5; color: #e5e7eb; border-left: 3px solid #10b981; }
    .footer { padding: 18px 24px; border-top: 1px solid #14532d; text-align: center; font-size: 12px; color: #9ca3af; }
    .badge { display: inline-block; background-color: #064e3b; color: #a7f3d0; padding: 3px 8px; border-radius: 9999px; font-size: 12px; font-weight: 600; border: 1px solid #059669; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>⚡ NEW PEERCUIT APPLICATION</h1>
      <p>A new student builder has applied to join the community.</p>
    </div>
    <div class="content">
      <div class="field-group">
        <div class="label">Applicant Name</div>
        <div class="value">${escapeHtml(data.fullName)} <span class="badge">${escapeHtml(data.grade)}</span></div>
      </div>
      
      <div class="field-group">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:${escapeHtml(data.email)}" style="color: #34d399; text-decoration: none;">${escapeHtml(data.email)}</a></div>
      </div>

      <div class="field-group">
        <div class="label">School / Institution & Location</div>
        <div class="value">${escapeHtml(data.school)} &bull; ${escapeHtml(data.location)} ${data.age ? `(Age: ${escapeHtml(data.age)})` : ""}</div>
      </div>

      <div class="field-group">
        <div class="label">How they found Peercuit</div>
        <div class="value">${escapeHtml(data.referral)}</div>
      </div>

      ${
        (data.links && data.links.filter(Boolean).length > 0) || data.portfolioLink
          ? `<div class="field-group">
              <div class="label">Portfolio / Project / Social Links</div>
              <div class="value">
                ${(data.links && data.links.filter(Boolean).length > 0 ? data.links.filter(Boolean) : [data.portfolioLink])
                  .map(
                    (link) =>
                      `<div style="margin-bottom: 4px;"><a href="${escapeHtml(link || "")}" target="_blank" style="color: #6ee7b7; text-decoration: underline;">${escapeHtml(link || "")}</a></div>`
                  )
                  .join("")}
              </div>
             </div>`
          : ""
      }

      <div class="field-group">
        <div class="label">What they are currently working on / interested in:</div>
        <div class="box">${escapeHtml(data.currentWork).replace(/\n/g, "<br/>")}</div>
      </div>

      <div class="field-group">
        <div class="label">Why they want to join Peercuit:</div>
        <div class="box">${escapeHtml(data.whyJoin).replace(/\n/g, "<br/>")}</div>
      </div>
    </div>
    <div class="footer">
      Peercuit Community &bull; Student Builder Network
    </div>
  </div>
</body>
</html>
`;

    // Construct Applicant Email HTML
    const applicantFirstName = data.fullName.trim().split(" ")[0] || "there";
    const applicantEmailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #050806; color: #f3f4f6; margin: 0; padding: 24px; }
    .card { background-color: #0b140f; border: 1px solid #14532d; border-radius: 12px; max-width: 550px; margin: 0 auto; overflow: hidden; }
    .header { background: linear-gradient(135deg, #047857, #065f46); padding: 28px 24px; color: white; text-align: center; }
    .header h1 { margin: 0 0 8px 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em; }
    .header p { margin: 0; font-size: 14px; opacity: 0.95; }
    .content { padding: 28px 24px; font-size: 15px; line-height: 1.6; color: #d1d5db; }
    .step { background-color: #13241b; border-radius: 8px; padding: 14px 18px; margin: 12px 0; display: flex; align-items: center; border-left: 3px solid #10b981; }
    .step-number { background-color: #059669; color: white; width: 26px; height: 26px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: bold; font-size: 13px; margin-right: 12px; flex-shrink: 0; }
    .footer { padding: 18px 24px; border-top: 1px solid #14532d; text-align: center; font-size: 13px; color: #9ca3af; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>We got your application, ${escapeHtml(applicantFirstName)}! 🎉</h1>
      <p>Thanks for applying to Peercuit.</p>
    </div>
    <div class="content">
      <p>Hey ${escapeHtml(applicantFirstName)},</p>
      <p>We're thrilled you want to join our circle of student builders, creators, and thinkers. We review every application personally to keep the community vibrant and supportive.</p>
      
      <h3 style="color: #34d399; font-size: 16px; margin: 20px 0 10px 0;">What happens next:</h3>
      
      <div class="step">
        <span class="step-number">1</span>
        <div><strong>Application Review:</strong> We'll read your responses within 24–48 hours.</div>
      </div>
      <div class="step">
        <span class="step-number">2</span>
        <div><strong>WhatsApp Community Invite:</strong> If accepted, you'll get an invite link directly to our private group.</div>
      </div>
      <div class="step">
        <span class="step-number">3</span>
        <div><strong>Introduce Yourself & Build:</strong> Share what you're working on, get feedback, and meet peers!</div>
      </div>

      <p style="margin-top: 24px;">In the meantime, feel free to reply directly to this email if you have any questions.</p>
      <p style="margin-bottom: 0;">Cheering you on,<br/><strong style="color: #34d399;">The Peercuit Team</strong></p>
    </div>
    <div class="footer">
      PEERCUIT &bull; Built by students, for students.
    </div>
  </div>
</body>
</html>
`;

    // Send both emails concurrently
    const [adminResult, applicantResult] = await Promise.allSettled([
      // 1. Admin notification email
      transporter.sendMail({
        from: SENDER_EMAIL,
        to: ADMIN_EMAIL,
        subject: `⚡ New Peercuit Application: ${data.fullName} (${data.school})`,
        html: adminEmailHtml,
        replyTo: data.email,
      }),

      // 2. Applicant confirmation email
      transporter.sendMail({
        from: SENDER_EMAIL,
        to: data.email,
        subject: `We've received your Peercuit application! 🚀`,
        html: applicantEmailHtml,
        replyTo: ADMIN_EMAIL,
      }),
    ]);

    if (adminResult.status === 'rejected') {
      console.error("[Email Service] Failed to send admin notification email:", adminResult.reason);
    } else {
      console.log("[Email Service] Admin notification email sent successfully:", adminResult.value.messageId);
    }

    if (applicantResult.status === 'rejected') {
      console.error("[Email Service] Failed to send applicant confirmation email:", applicantResult.reason);
    } else {
      console.log("[Email Service] Applicant confirmation email sent successfully:", applicantResult.value.messageId);
    }

    const successful = adminResult.status === 'fulfilled' || applicantResult.status === 'fulfilled';
    return {
      success: successful,
      messageId: adminResult.status === 'fulfilled' ? adminResult.value.messageId : undefined,
    };
  } catch (error: unknown) {
    const err = error as Error;
    console.error("[Email Service] General mail dispatch error:", err);
    return { success: false, error: err.message || "Failed to send email notification" };
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
