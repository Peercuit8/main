'use client'

import { useState } from 'react'
import Link from 'next/link'
import { LayoutDashboard, Users, Settings, BarChart3, Network, ClipboardList, Menu, X } from 'lucide-react'
import SignOutButton from '@/components/SignOutButton'
import { ThemeToggle } from '@/components/ThemeToggle'

export function Sidebar({ email }: { email: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Toggle Button (Visible only on small screens) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-bg-surface border border-border-card rounded-lg text-text-primary shadow-sm"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 w-64 glass-card border-r border-border-card flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6 border-b border-border-card flex items-center gap-3 mt-10 md:mt-0">
          <img src="/logo.png" alt="Peercuit Logo" className="w-8 h-8 rounded-lg object-cover shadow-sm" />
          <h1 className="font-bold text-xl tracking-tight text-text-primary">Admin</h1>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          <Link onClick={() => setIsOpen(false)} href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link onClick={() => setIsOpen(false)} href="/analytics" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors">
            <BarChart3 className="w-5 h-5" />
            <span className="font-medium">Analytics</span>
          </Link>
          <Link onClick={() => setIsOpen(false)} href="/matching" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors">
            <Network className="w-5 h-5" />
            <span className="font-medium">Matching</span>
          </Link>
          <Link onClick={() => setIsOpen(false)} href="/admins" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors">
            <Users className="w-5 h-5" />
            <span className="font-medium">Admins</span>
          </Link>
          <Link onClick={() => setIsOpen(false)} href="/audit" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors">
            <ClipboardList className="w-5 h-5" />
            <span className="font-medium">Audit Logs</span>
          </Link>
          <Link onClick={() => setIsOpen(false)} href="/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-bg-surface hover:text-text-primary transition-colors">
            <Settings className="w-5 h-5" />
            <span className="font-medium">Settings</span>
          </Link>
        </div>

        <div className="p-4 border-t border-border-card">
          <div className="flex flex-col gap-4">
            <span className="text-xs font-medium text-text-muted truncate px-2">
              {email}
            </span>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <div className="flex-1">
                <SignOutButton />
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
