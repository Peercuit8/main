import { createClient } from '@/lib/supabase/server'
import Dashboard from '@/components/Dashboard'
import { redirect } from 'next/navigation'

export default async function Page() {
  const supabase = await createClient()

  // Verify auth
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // Fetch responses
  const { data: responses, error } = await supabase
    .from('applications')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching responses:', error)
  }

  return <Dashboard initialResponses={responses || []} userEmail={user.email!} />
}
