import { ReactNode } from 'react'
import Link from 'next/link'
import { LayoutDashboard, Users, Settings, BarChart3, Network, ClipboardList } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import SignOutButton from '@/components/SignOutButton'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-primary overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 glass-card border-r border-border-card flex flex-col z-20">
        <div className="p-6 border-b border-border-card flex items-center gap-3">
          <img src="/logo.png" alt="Peercuit Logo" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
          <h1 className="font-bold text-xl tracking-tight text-text-primary">Admin</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/analytics" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors">
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">Analytics</span>
          </Link>
          <Link href="/matching" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors">
            <Network className="w-5 h-5" />
            <span className="font-medium">Matching</span>
          </Link>
          <Link href="/admins" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors">
            <Users className="w-5 h-5" />
            <span className="font-medium">Admins</span>
          </Link>
          <Link href="/audit" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors">
            <ClipboardList className="w-5 h-5" />
            <span className="font-medium">Audit Logs</span>
          </Link>
          <Link href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </Link>
        </div>

        <div className="p-4 border-t border-border-card">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium text-text-muted truncate px-2">
              {user.email}
            </span>
            {/* Sign Out */}
            <SignOutButton />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern pointer-events-none" />
        <div className="absolute w-full h-full radial-glow-emerald pointer-events-none" />
        
        <div className="relative z-10 p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
