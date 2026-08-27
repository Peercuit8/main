import { SyncSheetsButton } from './SyncSheetsButton'
import { FileSpreadsheet, Mail, Power } from 'lucide-react'
import { getSetting } from '@/lib/settings'
import { EmailTemplateForm } from './EmailTemplateForm'
import { ApplicationToggle } from './ApplicationToggle'

export const dynamic = 'force-dynamic'

const defaultEmailBody = `
<div style="font-family: sans-serif; padding: 20px; color: #333; background-color: #edf8f0; border-radius: 8px;">
  <h2 style="color: #0d623d;">Hello everyone!</h2>
  <p>You have been matched for a coffee chat based on your shared interests.</p>
  <p>Reply all to this email to figure out a time that works for everyone to hop on a quick call and get to know each other.</p>
  <p>Enjoy your chat!</p>
  <p style="font-size: 12px; color: #666; margin-top: 30px;">- The Peercuit Team</p>
</div>
`;

const defaultAcceptanceBody = `
<div style="font-family: sans-serif; padding: 24px; color: #1e293b; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; max-width: 600px; margin: 0 auto;">
  <h2 style="color: #0d623d; margin-top: 0; font-size: 22px;">Welcome to Peercuit! 🎉</h2>
  <p style="font-size: 15px; line-height: 1.6;">Congratulations, your application to join the Peercuit community has been accepted!</p>
  <p style="font-size: 15px; line-height: 1.6;">Click the button below to join the private WhatsApp community. Please note that this is your <strong>single-use, personalized invite link</strong>:</p>
  
  <div style="margin: 28px 0; text-align: center;">
    <a href="{invite_link}" style="background-color: #0d623d; color: #ffffff; padding: 14px 28px; font-weight: 700; border-radius: 10px; text-decoration: none; display: inline-block; font-size: 15px;">
      👉 Join WhatsApp Community
    </a>
  </div>

  <p style="font-size: 12px; color: #64748b; line-height: 1.5; text-align: center;">
    🔒 <em>This invite link will expire once you click it. Please do not share or forward this link.</em>
  </p>

  <hr style="border: none; border-top: 1px solid #dcfce7; margin: 24px 0;" />
  <p style="font-size: 13px; color: #475569; margin-bottom: 0;">Cheering you on,<br/><strong style="color: #0d623d;">The Peercuit Team</strong></p>
</div>
`;

const defaultRejectionBody = `
<div style="font-family: sans-serif; padding: 20px; color: #333; background-color: #fcf4f4; border-radius: 8px;">
  <h2 style="color: #c53030;">Update on your Peercuit Application</h2>
  <p>Thank you for applying to Peercuit.</p>
  <p>Unfortunately, we are unable to offer you a spot in our community at this time.</p>
  <p>We encourage you to apply again in the future.</p>
  <p style="font-size: 12px; color: #666; margin-top: 30px;">- The Peercuit Team</p>
</div>
`;

export default async function SettingsPage() {
  const isGoogleConfigured = !!(process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY && process.env.GOOGLE_SHEET_ID)

  const emailTemplate = await getSetting<{ subject: string, body: string }>('coffee_chat_email_template', {
    subject: 'Your Peercuit Coffee Chat Match!',
    body: defaultEmailBody.trim()
  });

  const acceptanceTemplate = await getSetting<{ subject: string, body: string }>('acceptance_email_template', {
    subject: 'You have been accepted to Peercuit!',
    body: defaultAcceptanceBody.trim()
  });

  const rejectionTemplate = await getSetting<{ subject: string, body: string }>('rejection_email_template', {
    subject: 'Update on your Peercuit application',
    body: defaultRejectionBody.trim()
  });

  const applicationsOpen = await getSetting<boolean>('applications_open', true);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold gradient-text-highlight mb-2">Settings & Integrations</h2>
        <p className="text-text-secondary">Configure external integrations and system settings.</p>
      </div>

      {/* Applications Status Toggle */}
      <div className="glass-card rounded-2xl overflow-hidden shadow-sm p-8 mb-8">
        <div className="flex items-start gap-6">
          <div className="bg-purple-100 p-4 rounded-xl">
            <Power className="w-8 h-8 text-purple-700" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-text-primary mb-2">Applications Status</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Turn applications on or off. When off, the public website will not allow new submissions.
            </p>
            <ApplicationToggle initialStatus={applicationsOpen} />
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden shadow-sm p-8">
        <div className="flex items-start gap-6">
          <div className="bg-green-100 p-4 rounded-xl">
            <FileSpreadsheet className="w-8 h-8 text-green-700" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-text-primary mb-2">Google Sheets Sync</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Manually push all responses from the Peercuit database to your connected Google Sheet. 
              This will create or update a sheet named "Responses".
            </p>

            <div className="bg-bg-surface p-4 rounded-lg border border-border-card mb-6">
              <h4 className="text-sm font-semibold text-text-primary mb-3">Status</h4>
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${isGoogleConfigured ? 'bg-green-500' : 'bg-red-500'}`} />
                <span className="text-sm font-medium text-text-secondary">
                  {isGoogleConfigured ? 'Configured via Environment Variables' : 'Missing Environment Variables'}
                </span>
              </div>
              {!isGoogleConfigured && (
                <p className="text-xs text-text-muted mt-2">
                  Please configure GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEET_ID in your .env file.
                </p>
              )}
            </div>

            <SyncSheetsButton />
          </div>
        </div>
      </div>
      <div className="glass-card rounded-2xl overflow-hidden shadow-sm p-8 mt-8">
        <div className="flex items-start gap-6">
          <div className="bg-blue-100 p-4 rounded-xl">
            <Mail className="w-8 h-8 text-blue-700" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-text-primary mb-2">Coffee Chat Email Template</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Customize the email sent to users when they are matched for a coffee chat.
            </p>
            <EmailTemplateForm settingKey="coffee_chat_email_template" initialSubject={emailTemplate.subject} initialBody={emailTemplate.body} />
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden shadow-sm p-8 mt-8">
        <div className="flex items-start gap-6">
          <div className="bg-green-100 p-4 rounded-xl">
            <Mail className="w-8 h-8 text-green-700" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-text-primary mb-2">Acceptance Email Template</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Customize the email sent when you accept a user's application.
            </p>
            <EmailTemplateForm settingKey="acceptance_email_template" initialSubject={acceptanceTemplate.subject} initialBody={acceptanceTemplate.body} />
          </div>
        </div>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden shadow-sm p-8 mt-8 mb-12">
        <div className="flex items-start gap-6">
          <div className="bg-red-100 p-4 rounded-xl">
            <Mail className="w-8 h-8 text-red-700" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold text-text-primary mb-2">Rejection Email Template</h3>
            <p className="text-text-secondary mb-6 leading-relaxed">
              Customize the email sent when you reject a user's application.
            </p>
            <EmailTemplateForm settingKey="rejection_email_template" initialSubject={rejectionTemplate.subject} initialBody={rejectionTemplate.body} />
          </div>
        </div>
      </div>
    </div>
  )
}
