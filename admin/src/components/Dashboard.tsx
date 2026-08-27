'use client'

import { useState } from 'react'
import { Users, Mail, CheckCircle, XCircle, Clock, Loader2, RefreshCw, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export type ResponseRow = {
  id: string
  full_name?: string
  email: string
  school?: string
  grade?: string
  location?: string
  current_work?: string
  why_join?: string
  portfolio_link?: string
  status: 'pending' | 'accepted' | 'rejected'
  matched: boolean
  interests?: string[]
  created_at: string
}

export default function Dashboard({ initialResponses, userEmail }: { initialResponses: ResponseRow[], userEmail: string }) {
  const [responses, setResponses] = useState<ResponseRow[]>(initialResponses)
  const [loadingAction, setLoadingAction] = useState<string | null>(null)
  const [matching, setMatching] = useState(false)
  const [selectedResponse, setSelectedResponse] = useState<ResponseRow | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleAction = async (id: string, action: 'accept' | 'reject' | 'delete', email: string) => {
    setLoadingAction(id)
    try {
      const res = await fetch('/api/response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action, email }),
      })
      if (!res.ok) throw new Error('Action failed')
      
      // Update local state to feel snappy
      if (action === 'delete') {
        setResponses(prev => prev.filter(r => r.id !== id))
      } else {
        setResponses(prev => prev.map(r => r.id === id ? { ...r, status: action === 'accept' ? 'accepted' : 'rejected' } : r))
      }
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
    const searchString = `${r.email} ${r.full_name || ''} ${r.school || ''}`.toLowerCase()
    const matchesSearch = searchString.includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter
    const matchesDuplicate = showDuplicates ? emailCounts[r.email] > 1 : true
    return matchesSearch && matchesStatus && matchesDuplicate
  })

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Email', 'School', 'Grade', 'Location', 'Status', 'Matched', 'Current Work', 'Why Join', 'Portfolio Link', 'Interests', 'Created At']
    const rows = filteredResponses.map(r => [
      r.id,
      r.full_name || '',
      r.email,
      r.school || '',
      r.grade || '',
      r.location || '',
      r.status,
      r.matched ? 'Yes' : 'No',
      r.current_work || '',
      r.why_join || '',
      r.portfolio_link || '',
      (r.interests || []).join('; '),
      new Date(r.created_at).toLocaleString()
    ])
    
    const csvContent = [headers, ...rows].map(e => e.map(f => `"${String(f).replace(/"/g, '""')}"`).join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', 'peercuit_applications.csv')
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
              placeholder="Search by name, email, or school..." 
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
                  <th className="p-5 font-semibold">Applicant</th>
                  <th className="p-5 font-semibold">School & Grade</th>
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
                  <tr key={res.id} onClick={() => setSelectedResponse(res)} className="hover:bg-bg-surface/50 transition-colors group cursor-pointer">
                    <td className="p-5 font-medium text-text-primary">
                      <div className="flex flex-col gap-1 items-start">
                        <span className="font-semibold">{res.full_name || 'N/A'}</span>
                        <span className="text-xs text-text-muted">{res.email}</span>
                        {isDuplicate && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 px-1.5 py-0.5 rounded-sm">
                            Duplicate
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-5 text-text-secondary text-sm">
                      <div className="flex flex-col gap-1">
                        <span>{res.school || '-'}</span>
                        <span className="text-xs text-text-muted">{res.grade || '-'}</span>
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
                      <div className="flex justify-end items-center gap-2">
                        {res.status === 'pending' ? (
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              disabled={loadingAction === res.id}
                              onClick={(e) => { e.stopPropagation(); handleAction(res.id, 'accept', res.email); }}
                              className="bg-brand-mint-bg text-brand-mint-text px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-brand-green-primary hover:text-white transition-colors disabled:opacity-50"
                            >
                              Accept
                            </button>
                            <button 
                              disabled={loadingAction === res.id}
                              onClick={(e) => { e.stopPropagation(); handleAction(res.id, 'reject', res.email); }}
                              className="bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          <span className="text-text-muted text-sm italic mr-2">Resolved</span>
                        )}
                        <button
                          title="Delete Application"
                          disabled={loadingAction === res.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (confirm('Are you sure you want to permanently delete this application?')) {
                              handleAction(res.id, 'delete', res.email);
                            }
                          }}
                          className="text-red-400 hover:text-red-600 dark:hover:text-red-300 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-50 opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
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

      {selectedResponse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedResponse(null)}>
          <div className="bg-bg-card rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative border border-border-card" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 text-text-muted hover:text-text-primary transition-colors"
              onClick={() => setSelectedResponse(null)}
            >
              <XCircle className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-text-primary">Application Details</h2>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-text-muted uppercase font-semibold tracking-wider">Name</label>
                  <p className="text-text-primary font-medium mt-1">{selectedResponse.full_name || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs text-text-muted uppercase font-semibold tracking-wider">Email</label>
                  <p className="text-text-primary font-medium mt-1">{selectedResponse.email}</p>
                </div>
                <div>
                  <label className="text-xs text-text-muted uppercase font-semibold tracking-wider">School</label>
                  <p className="text-text-primary font-medium mt-1">{selectedResponse.school || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs text-text-muted uppercase font-semibold tracking-wider">Grade</label>
                  <p className="text-text-primary font-medium mt-1">{selectedResponse.grade || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs text-text-muted uppercase font-semibold tracking-wider">Location</label>
                  <p className="text-text-primary font-medium mt-1">{selectedResponse.location || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs text-text-muted uppercase font-semibold tracking-wider">Status</label>
                  <p className="text-text-primary font-medium mt-1 capitalize">{selectedResponse.status}</p>
                </div>
              </div>
              
              <div>
                <label className="text-xs text-text-muted uppercase font-semibold tracking-wider">Current Work / Interests</label>
                <div className="mt-2 p-4 rounded-xl bg-bg-surface border border-border-card text-text-secondary whitespace-pre-wrap text-sm leading-relaxed">
                  {selectedResponse.current_work || 'N/A'}
                </div>
              </div>
              
              <div>
                <label className="text-xs text-text-muted uppercase font-semibold tracking-wider">Why Join Peercuit</label>
                <div className="mt-2 p-4 rounded-xl bg-bg-surface border border-border-card text-text-secondary whitespace-pre-wrap text-sm leading-relaxed">
                  {selectedResponse.why_join || 'N/A'}
                </div>
              </div>
              
              <div>
                <label className="text-xs text-text-muted uppercase font-semibold tracking-wider">Interests</label>
                <div className="mt-2 text-sm text-text-secondary">
                  {selectedResponse.interests && selectedResponse.interests.length > 0 
                    ? selectedResponse.interests.join(', ') 
                    : 'N/A'}
                </div>
              </div>

              <div>
                <label className="text-xs text-text-muted uppercase font-semibold tracking-wider">Portfolio / Links</label>
                <div className="mt-2 text-sm">
                  {selectedResponse.portfolio_link ? (
                    <a href={selectedResponse.portfolio_link} target="_blank" rel="noopener noreferrer" className="text-brand-green-primary hover:underline font-medium break-all">
                      {selectedResponse.portfolio_link}
                    </a>
                  ) : (
                    <span className="text-text-muted">N/A</span>
                  )}
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-border-card mt-6">
                <button
                  disabled={loadingAction === selectedResponse.id}
                  onClick={() => {
                    if (confirm('Are you sure you want to permanently delete this application?')) {
                      handleAction(selectedResponse.id, 'delete', selectedResponse.email);
                      setSelectedResponse(null);
                    }
                  }}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium text-sm flex items-center gap-1.5 transition-colors disabled:opacity-50"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>

                {selectedResponse.status === 'pending' ? (
                  <div className="flex justify-end gap-3">
                    <button 
                      disabled={loadingAction === selectedResponse.id}
                      onClick={() => { handleAction(selectedResponse.id, 'reject', selectedResponse.email); setSelectedResponse(null); }}
                      className="bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-600 hover:text-white transition-colors disabled:opacity-50"
                    >
                      Reject
                    </button>
                    <button 
                      disabled={loadingAction === selectedResponse.id}
                      onClick={() => { handleAction(selectedResponse.id, 'accept', selectedResponse.email); setSelectedResponse(null); }}
                      className="bg-brand-green-primary text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-brand-green-primary/90 transition-colors shadow-md disabled:opacity-50"
                    >
                      Accept
                    </button>
                  </div>
                ) : (
                  <div className="text-text-muted text-sm italic">
                    Resolved ({selectedResponse.status})
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
