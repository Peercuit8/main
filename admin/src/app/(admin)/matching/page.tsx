import { supabaseAdmin } from '@/lib/supabase'
import { MatchingInterface } from './MatchingInterface'

export const dynamic = 'force-dynamic'

export default async function MatchingPage() {
  const { data: users, error } = await supabaseAdmin
    .from('applications')
    .select('*')
    .eq('status', 'accepted')
    .eq('matched', false)
    .order('created_at', { ascending: true })

  if (error) {
    console.error('Error fetching unmatched users:', error)
  }

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold gradient-text-highlight mb-2">Manual Matching</h2>
        <p className="text-text-secondary">Group users and preview matches before sending out emails.</p>
      </div>

      <MatchingInterface initialUsers={users || []} />
    </div>
  )
}
