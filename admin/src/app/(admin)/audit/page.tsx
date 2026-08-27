import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export default async function AuditPage() {
  const { data: logs, error } = await supabaseAdmin
    .from('audit_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(100)

  if (error) {
    console.error('Error fetching audit logs:', error)
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold gradient-text-highlight mb-2">Audit Logs</h2>
        <p className="text-text-secondary">Track administrative actions and system events.</p>
      </div>

      <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-surface border-b border-border-card text-text-secondary text-sm">
                <th className="p-5 font-semibold">Date</th>
                <th className="p-5 font-semibold">Admin Email</th>
                <th className="p-5 font-semibold">Action</th>
                <th className="p-5 font-semibold">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-card">
              {logs?.map((log: any) => (
                <tr key={log.id} className="hover:bg-bg-surface/50 transition-colors group">
                  <td className="p-5 text-text-muted text-sm whitespace-nowrap">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="p-5 font-medium text-text-primary">{log.admin_email}</td>
                  <td className="p-5 text-brand-green-primary font-medium">{log.action}</td>
                  <td className="p-5 text-sm text-text-secondary">
                    <pre className="bg-bg-surface p-2 rounded border border-border-card text-xs overflow-x-auto max-w-xs">
                      {JSON.stringify(log.details, null, 2)}
                    </pre>
                  </td>
                </tr>
              ))}
              {(!logs || logs.length === 0) && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-text-muted">
                    No audit logs found. Make sure you've run the SQL migration.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
