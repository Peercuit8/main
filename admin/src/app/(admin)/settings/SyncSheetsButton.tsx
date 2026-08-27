'use client';

import { useState } from 'react';
import { Loader2, RefreshCw } from 'lucide-react';

export function SyncSheetsButton() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSync = async () => {
    setIsSyncing(true);
    setMessage(null);
    try {
      const res = await fetch('/api/sync-sheets', { method: 'POST' });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to sync');
      }
      
      setMessage({ type: 'success', text: `Successfully synced ${data.count} rows to Google Sheets.` });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button 
        onClick={handleSync}
        disabled={isSyncing}
        className="bg-brand-green-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md shadow-brand-green-primary/20 transition-all flex items-center justify-center gap-2 w-fit disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isSyncing ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
        {isSyncing ? 'Syncing to Sheets...' : 'Sync Now'}
      </button>

      {message && (
        <div className={`p-4 rounded-lg text-sm font-medium border ${message.type === 'success' ? 'bg-brand-mint-bg text-brand-mint-text border-brand-mint-text/20' : 'bg-red-50 text-red-600 border-red-200'}`}>
          {message.text}
        </div>
      )}
    </div>
  );
}
