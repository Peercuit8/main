import { supabaseAdmin } from '@/lib/supabase'
import { AddAdminForm } from './AddAdminForm'
import { DeleteAdminButton } from './DeleteAdminButton'

export const dynamic = 'force-dynamic'

export default async function AdminsPage() {
  const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers()

  if (error) {
    console.error('Error fetching users:', error)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold gradient-text-highlight mb-2">Manage Admins</h2>
        <p className="text-text-secondary">Add or remove administrators who can access this dashboard.</p>
      </div>

      <AddAdminForm />

      <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
        <div className="p-6 border-b border-border-card">
          <h3 className="text-lg font-semibold text-text-primary">Current Admins</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-bg-surface border-b border-border-card text-text-secondary text-sm">
                <th className="p-5 font-semibold">Email</th>
                <th className="p-5 font-semibold">Created At</th>
                <th className="p-5 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-card">
              {users?.map(user => (
                <tr key={user.id} className="hover:bg-bg-surface/50 transition-colors group">
                  <td className="p-5 font-medium text-text-primary">{user.email}</td>
                  <td className="p-5 text-text-muted text-sm">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="p-5 text-right">
                    <DeleteAdminButton userId={user.id} userEmail={user.email!} />
                  </td>
                </tr>
              ))}
              {(!users || users.length === 0) && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-text-muted">
                    No admins found.
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
