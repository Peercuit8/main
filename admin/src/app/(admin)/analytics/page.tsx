import { supabaseAdmin } from '@/lib/supabase'
import { AnalyticsCharts } from './AnalyticsCharts'

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {
  const { data: responses, error } = await supabaseAdmin
    .from('applications')
    .select('*')

  if (error) {
    console.error('Error fetching responses for analytics:', error)
  }

  const validResponses = responses || []

  // 1. Process data for Sign-ups Over Time
  const dailyCounts: Record<string, number> = {}
  validResponses.forEach(r => {
    const dateStr = new Date(r.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    dailyCounts[dateStr] = (dailyCounts[dateStr] || 0) + 1
  })

  // Convert to array and sort chronologically (assuming they're recent and same year for simplicity)
  // A better way is to sort by original date then format
  const sortedResponses = [...validResponses].sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
  
  const chronologicalDailyCounts: Record<string, number> = {}
  sortedResponses.forEach(r => {
    const dateStr = new Date(r.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
    chronologicalDailyCounts[dateStr] = (chronologicalDailyCounts[dateStr] || 0) + 1
  })

  const dailyData = Object.keys(chronologicalDailyCounts).map(date => ({
    date,
    count: chronologicalDailyCounts[date]
  }))


  const interestCounts: Record<string, number> = {}
  validResponses.forEach(r => {
    if (r.interests && Array.isArray(r.interests)) {
      r.interests.forEach((interest: string) => {
        interestCounts[interest] = (interestCounts[interest] || 0) + 1
      })
    }
  })

  const interestData = Object.keys(interestCounts)
    .map(interest => ({ interest, count: interestCounts[interest] }))
    .sort((a, b) => b.count - a.count)

  // 3. Process data for Referrals
  const referralCounts: Record<string, number> = {}
  validResponses.forEach(r => {
    if (r.referral) {
      const ref = r.referral.trim();
      referralCounts[ref] = (referralCounts[ref] || 0) + 1;
    }
  })
  
  const referralData = Object.keys(referralCounts)
    .map(source => ({ source, count: referralCounts[source] }))
    .sort((a, b) => b.count - a.count);

  // 4. Process Funnel Data
  const totalApplied = validResponses.length;
  const accepted = validResponses.filter(r => r.status === 'accepted').length;
  const rejected = validResponses.filter(r => r.status === 'rejected').length;
  const pending = validResponses.filter(r => r.status === 'pending').length;
  const joined = validResponses.filter(r => r.invite_token_used).length;

  const funnelData = [
    { name: 'Total Applicants', value: totalApplied },
    { name: 'Pending Review', value: pending },
    { name: 'Accepted', value: accepted },
    { name: 'Rejected', value: rejected },
    { name: 'Joined WhatsApp', value: joined },
  ]

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold gradient-text-highlight mb-2">Analytics & Insights</h2>
        <p className="text-text-secondary">View how your community is growing and what their interests are.</p>
      </div>

      <AnalyticsCharts 
        dailyData={dailyData} 
        interestData={interestData} 
        referralData={referralData}
        funnelData={funnelData}
      />
    </div>
  )
}
