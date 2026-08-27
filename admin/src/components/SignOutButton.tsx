'use client'

import { LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function SignOutButton() {
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-3 px-4 py-3 rounded-lg text-text-secondary hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-colors w-full"
    >
      <LogOut className="w-5 h-5" />
      <span className="font-medium">Sign Out</span>
    </button>
  )
}
