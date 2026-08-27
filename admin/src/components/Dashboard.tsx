'use client'

import { useState } from 'react'
import { Users, Mail, CheckCircle, XCircle, Clock, Loader2, RefreshCw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export type ResponseRow = {
  id: string
  email: string
  status: 'pending' | 'accepted' | 'rejected'
  matched: boolean
  interests?: string[]
  created_at: string
}

export default function Dashboard({ initialResponses, userEmail }: { initialResponses: ResponseRow[], userEmail: string }) {
  const [responses, setResponses] = useState<ResponseRow[]>(initialResponses)
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const [matching, setMatching] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleAction = async (id: string, action: 'accept' | 'reject', email: string) => {
    setLoadingAction(id)
    try {
      const res = await fetch('/api/response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action, email }),
      })
      if (!res.ok) throw new Error('Action failed')
      
      // Update local state to feel snappy
      setResponses(prev => prev.map(r => r.id === id ? { ...r, status: action === 'accept' ? 'accepted' : 'rejected' } : r))
    } catch (error) {
      alert('Error performing action. See console.')
      console.error(error)
    } finally {
      setLoadingAction(null)
    }
  }

  const triggerCoffeeChats = async () => {
    setMatching(true)
    try {
      const res = await fetch('/api/coffee-chat', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || data.error)
      alert(`Success! Formed ${data.groupsMatched} group(s). Emails sent!`)
      router.refresh() // To reload data from server
    } catch (error: any) {
      alert(error.message || 'Error triggering coffee chats')
    } finally {
      setMatching(false)
    }
  }

  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected'>('all')
  const [showDuplicates, setShowDuplicates] = useState(false)

  const emailCounts = responses.reduce((acc, r) => {
    acc[r.email] = (acc[r.email] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pendingCount = responses.filter(r => r.status === 'pending').length
  const acceptedCount = responses.filter(r => r.status === 'accepted').length
  const rejectedCount = responses.filter(r => r.status === 'rejected').length

  const filteredResponses = responses.filter(r => {
    const matchesSearch = r.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter
    const matchesDuplicate = showDuplicates ? emailCounts[r.email] > 1 : true
    return matchesSearch && matchesStatus && matchesDuplicate
  })

  const exportCSV = () => {
    const headers = ['ID', 'Email', 'Status', 'Matched', 'Interests', 'Created At']
    const rows = filteredResponses.map(r => [
      r.id,
      r.email,
      r.status,
      r.matched ? 'Yes' : 'No',
      (r.interests || []).join('; '),
      new Date(r.created_at).toLocaleString()
    ])
    
    const csvContent = [headers, ...rows].map(e => e.map(f => `"${f}"`).join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'peercuit_responses.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-primary relative overflow-hidden pb-12">
      {/* Background flourishes */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern pointer-events-none" />
      <div className="absolute w-full h-full radial-glow-emerald pointer-events-none" />


      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold gradient-text-highlight">Overview</h2>
          <button 
            onClick={triggerCoffeeChats}
            disabled={matching}
            className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md shadow-purple-500/20 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {matching ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
            {matching ? 'Matching...' : 'Trigger Coffee Chats'}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="glass-card glass-card-hover p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-text-muted font-medium mb-1">Pending Responses</p>
              <p className="text-4xl font-bold text-text-primary">{pendingCount}</p>
            </div>
            <div className="bg-yellow-500/10 p-4 rounded-full text-yellow-600">
              <Clock className="w-8 h-8" />
            </div>
          </div>
          <div className="glass-card glass-card-hover p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-text-muted font-medium mb-1">Accepted</p>
              <p className="text-4xl font-bold text-text-primary">{acceptedCount}</p>
            </div>
            <div className="bg-brand-green-primary/10 p-4 rounded-full text-brand-green-primary">
              <CheckCircle className="w-8 h-8" />
            </div>
          </div>
          <div className="glass-card glass-card-hover p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-text-muted font-medium mb-1">Rejected</p>
              <p className="text-4xl font-bold text-text-primary">{rejectedCount}</p>
            </div>
            <div className="bg-red-500/10 p-4 rounded-full text-red-500">
              <XCircle className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-4 items-center justify-between">
          <div className="flex flex-1 w-full gap-4 items-center flex-wrap">
            <input 
              type="text" 
              placeholder="Search by email..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="border border-border-card bg-bg-card text-text-primary p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green-primary w-full max-w-sm"
            />
            <select 
              value={statusFilter} 
              onChange={e => setStatusFilter(e.target.value as any)}
              className="border border-border-card bg-bg-card text-text-primary p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green-primary"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
            <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-text-secondary select-none">
              <input 
                type="checkbox" 
                checked={showDuplicates}
                onChange={(e) => setShowDuplicates(e.target.checked)}
                className="w-4 h-4 text-brand-green-primary bg-bg-card border-border-card rounded focus:ring-brand-green-primary"
              />
              Show Only Duplicates
            </label>
          </div>
          <button 
            onClick={exportCSV}
            className="bg-bg-surface border border-border-card text-text-secondary hover:text-text-primary hover:bg-bg-card px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
          >
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="glass-card rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-bg-surface border-b border-border-card text-text-secondary text-sm">
                  <th className="p-5 font-semibold">Email</th>
                  <th className="p-5 font-semibold">Date</th>
                  <th className="p-5 font-semibold">Status</th>
                  <th className="p-5 font-semibold">Matched</th>
                  <th className="p-5 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-card">
                {filteredResponses.map(res => {
                  const isDuplicate = emailCounts[res.email] > 1;
                  return (
                  <tr key={res.id} className="hover:bg-bg-surface/50 transition-colors group">
                    <td className="p-5 font-medium text-text-primary">
                      <div className="flex flex-col gap-1 items-start">
                        {res.email}
                        {isDuplicate && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-sm">
                            Duplicate
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-5 text-text-muted text-sm">{new Date(res.created_at).toLocaleDateString()}</td>
                    <td className="p-5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
                        ${res.status === 'accepted' ? 'bg-brand-mint-bg text-brand-mint-text' : 
                          res.status === 'rejected' ? 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400' : 
                          'bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400'}`}>
                        {res.status === 'accepted' && <CheckCircle className="w-3 h-3" />}
                        {res.status === 'rejected' && <XCircle className="w-3 h-3" />}
                        {res.status === 'pending' && <Clock className="w-3 h-3" />}
                        {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-5 text-sm">
                      {res.status === 'accepted' ? (
                        res.matched ? (
                          <span className="text-brand-green-primary font-medium flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Yes</span>
                        ) : (
                          <span className="text-text-muted">No</span>
                        )
                      ) : (
                        <span className="text-text-muted">-</span>
                      )}
                    </td>
                    <td className="p-5 text-right">
                      {res.status === 'pending' ? (
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            disabled={loadingAction === res.id}
                            onClick={() => handleAction(res.id, 'accept', res.email)}
                            className="bg-brand-mint-bg text-brand-mint-text px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-brand-green-primary hover:text-white transition-colors disabled:opacity-50"
                          >
                            Accept
                          </button>
                          <button 
                            disabled={loadingAction === res.id}
                            onClick={() => handleAction(res.id, 'reject', res.email)}
                            className="bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-text-muted text-sm italic">Resolved</span>
                      )}
                    </td>
                  </tr>
                  )
                })}
                {filteredResponses.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-text-muted">
                      No responses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
