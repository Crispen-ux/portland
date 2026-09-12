import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.EMAIL_FROM || "Portland Schools <noreply@portlandschools.co.za>";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams) {
  const { data, error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: Array.isArray(to) ? to : [to],
    subject,
    html,
    replyTo,
  });

  if (error) {
    console.error("Email send error:", error);
    throw new Error(error.message || "Failed to send email");
  }

  return data;
}

// ─── Email Templates ────────────────────────────────────

export function invitationEmail({ name, email, role, inviteUrl }: { name?: string; email: string; role: string; inviteUrl: string }) {
  const roleName = role.replace("_", " ").toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background-color:#F8F7F4;font-family:system-ui,-apple-system,sans-serif;">
      <div style="max-width:480px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        <div style="background:#C41E3A;padding:32px;text-align:center;">
          <h1 style="color:#fff;font-size:20px;margin:0;">Portland Schools</h1>
          <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:4px 0 0;">Group of Schools</p>
        </div>
        <div style="padding:32px;">
          <h2 style="color:#1A1A1A;font-size:18px;margin:0 0 16px;">You're Invited!</h2>
          <p style="color:#6B7280;font-size:14px;line-height:1.6;margin:0 0 16px;">
            ${name ? `Hi ${name},` : `Hi there,`}
          </p>
          <p style="color:#6B7280;font-size:14px;line-height:1.6;margin:0 0 16px;">
            You've been invited to join <strong>Portland Schools</strong> as a <strong>${roleName}</strong>.
            Click the button below to create your account.
          </p>
          <div style="text-align:center;margin:24px 0;">
            <a href="${inviteUrl}" style="display:inline-block;background:#C41E3A;color:#fff;font-weight:600;font-size:14px;padding:12px 32px;border-radius:12px;text-decoration:none;">
              Create Account
            </a>
          </div>
          <p style="color:#9CA3AF;font-size:12px;line-height:1.5;margin:0 0 8px;">
            This invitation expires in 7 days. If you didn't expect this, you can safely ignore this email.
          </p>
          <p style="color:#9CA3AF;font-size:12px;line-height:1.5;margin:0;">
            Or copy this link: <a href="${inviteUrl}" style="color:#C41E3A;word-break:break-all;">${inviteUrl}</a>
          </p>
        </div>
        <div style="background:#F9FAFB;padding:16px 32px;text-align:center;">
          <p style="color:#9CA3AF;font-size:11px;margin:0;">Portland Group of Schools · 188 Commissioner Street, Johannesburg</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function invoiceEmail({ studentName, invoiceNumber, totalAmount, dueDate, parentName, paymentLink }: {
  studentName: string;
  invoiceNumber: string;
  totalAmount: number;
  dueDate?: string;
  parentName: string;
  paymentLink: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background-color:#F8F7F4;font-family:system-ui,-apple-system,sans-serif;">
      <div style="max-width:480px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        <div style="background:#C41E3A;padding:32px;text-align:center;">
          <h1 style="color:#fff;font-size:20px;margin:0;">Portland Schools</h1>
          <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:4px 0 0;">Invoice</p>
        </div>
        <div style="padding:32px;">
          <p style="color:#6B7280;font-size:14px;line-height:1.6;margin:0 0 16px;">
            Dear ${parentName},
          </p>
          <p style="color:#6B7280;font-size:14px;line-height:1.6;margin:0 0 24px;">
            An invoice has been issued for <strong>${studentName}</strong>.
          </p>
          <div style="background:#F9FAFB;border-radius:12px;padding:20px;margin:0 0 24px;">
            <table style="width:100%;font-size:14px;color:#1A1A1A;">
              <tr><td style="padding:4px 0;color:#6B7280;">Invoice Number</td><td style="padding:4px 0;text-align:right;font-weight:600;">${invoiceNumber}</td></tr>
              <tr><td style="padding:4px 0;color:#6B7280;">Student</td><td style="padding:4px 0;text-align:right;font-weight:600;">${studentName}</td></tr>
              <tr><td style="padding:4px 0;color:#6B7280;">Amount Due</td><td style="padding:4px 0;text-align:right;font-weight:700;color:#C41E3A;font-size:18px;">R ${totalAmount.toLocaleString("en-ZA", { minimumFractionDigits: 2 })}</td></tr>
              ${dueDate ? `<tr><td style="padding:4px 0;color:#6B7280;">Due Date</td><td style="padding:4px 0;text-align:right;font-weight:600;">${dueDate}</td></tr>` : ""}
            </table>
          </div>
          <div style="text-align:center;margin:24px 0;">
            <a href="${paymentLink}" style="display:inline-block;background:#C41E3A;color:#fff;font-weight:600;font-size:14px;padding:12px 32px;border-radius:12px;text-decoration:none;">
              View Invoice
            </a>
          </div>
          <p style="color:#9CA3AF;font-size:12px;line-height:1.5;margin:0;">
            If you have any questions, please contact us at <a href="mailto:info@portlandschools.co.za" style="color:#C41E3A;">info@portlandschools.co.za</a>.
          </p>
        </div>
        <div style="background:#F9FAFB;padding:16px 32px;text-align:center;">
          <p style="color:#9CA3AF;font-size:11px;margin:0;">Portland Group of Schools · 188 Commissioner Street, Johannesburg</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function reportCardEmail({ studentName, term, year, parentName, reportLink }: {
  studentName: string;
  term: string;
  year: string;
  parentName: string;
  reportLink: string;
}) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background-color:#F8F7F4;font-family:system-ui,-apple-system,sans-serif;">
      <div style="max-width:480px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        <div style="background:#C41E3A;padding:32px;text-align:center;">
          <h1 style="color:#fff;font-size:20px;margin:0;">Portland Schools</h1>
          <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:4px 0 0;">Report Card</p>
        </div>
        <div style="padding:32px;">
          <p style="color:#6B7280;font-size:14px;line-height:1.6;margin:0 0 16px;">
            Dear ${parentName},
          </p>
          <p style="color:#6B7280;font-size:14px;line-height:1.6;margin:0 0 24px;">
            The report card for <strong>${studentName}</strong> for <strong>${term} ${year}</strong> is now available.
          </p>
          <div style="text-align:center;margin:24px 0;">
            <a href="${reportLink}" style="display:inline-block;background:#C41E3A;color:#fff;font-weight:600;font-size:14px;padding:12px 32px;border-radius:12px;text-decoration:none;">
              View Report Card
            </a>
          </div>
          <p style="color:#9CA3AF;font-size:12px;line-height:1.5;margin:0;">
            If you have any questions, please contact us at <a href="mailto:info@portlandschools.co.za" style="color:#C41E3A;">info@portlandschools.co.za</a>.
          </p>
        </div>
        <div style="background:#F9FAFB;padding:16px 32px;text-align:center;">
          <p style="color:#9CA3AF;font-size:11px;margin:0;">Portland Group of Schools · 188 Commissioner Street, Johannesburg</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generalEmail({ subject, body, recipientName }: { subject: string; body: string; recipientName?: string }) {
  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="margin:0;padding:0;background-color:#F8F7F4;font-family:system-ui,-apple-system,sans-serif;">
      <div style="max-width:480px;margin:40px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        <div style="background:#C41E3A;padding:32px;text-align:center;">
          <h1 style="color:#fff;font-size:20px;margin:0;">Portland Schools</h1>
          <p style="color:rgba(255,255,255,0.8);font-size:13px;margin:4px 0 0;">${subject}</p>
        </div>
        <div style="padding:32px;">
          ${recipientName ? `<p style="color:#6B7280;font-size:14px;line-height:1.6;margin:0 0 16px;">Dear ${recipientName},</p>` : ""}
          <div style="color:#1A1A1A;font-size:14px;line-height:1.6;">
            ${body}
          </div>
        </div>
        <div style="background:#F9FAFB;padding:16px 32px;text-align:center;">
          <p style="color:#9CA3AF;font-size:11px;margin:0;">Portland Group of Schools · 188 Commissioner Street, Johannesburg</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
