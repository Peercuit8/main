import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL || 'peercuit8@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD, // Must be an App Password, not the regular password
  },
});

export async function sendEmail({ to, subject, html }: { to: string, subject: string, html: string }) {
  if (!process.env.GMAIL_APP_PASSWORD) {
    console.error('GMAIL_APP_PASSWORD is not set! Email will not be sent.');
    return false;
  }
  
  try {
    const info = await transporter.sendMail({
      from: '"Peercuit Admin" <' + (process.env.GMAIL_EMAIL || 'peercuit8@gmail.com') + '>',
      to,
      subject,
      html,
    });
    console.log('Email sent: %s', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}
