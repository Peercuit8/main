'use client';

import { useState } from 'react';
import { Loader2, Mail, Users, ArrowRightLeft } from 'lucide-react';
import { sendManualMatches } from './actions';
import { useRouter } from 'next/navigation';

export type UserRow = {
  id: string;
  email: string;
  interests?: string[];
}

export function MatchingInterface({ initialUsers }: { initialUsers: UserRow[] }) {
  const [users, setUsers] = useState<UserRow[]>(initialUsers);
  const [groups, setGroups] = useState<{ id: string, members: UserRow[] }[]>([]);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const router = useRouter();

  const generateGroups = () => {
    // Simple naive grouping by chunks of 3-4
    const newGroups = [];
    let groupIndex = 1;
    for (let i = 0; i < users.length; i += 4) {
      newGroups.push({
        id: `Group ${groupIndex++}`,
        members: users.slice(i, i + 4)
      });
    }
    setGroups(newGroups);
    setHasGenerated(true);
  };

  const moveUser = (userId: string, targetGroupId: string) => {
    // Find the user
    let userToMove: UserRow | undefined;
    
    const newGroups = groups.map(g => {
      const u = g.members.find(m => m.id === userId);
      if (u) userToMove = u;
      return { ...g, members: g.members.filter(m => m.id !== userId) };
    });

    if (userToMove) {
      const targetGroup = newGroups.find(g => g.id === targetGroupId);
      if (targetGroup) {
        targetGroup.members.push(userToMove);
      }
    }

    setGroups(newGroups);
  };

  const handleSendEmails = async () => {
    setIsSending(true);
    // filter out groups with < 2 members to be safe, or let user decide?
    // the automated API requires 3. Let's just send what the admin configured.
    try {
      const payload = groups.filter(g => g.members.length > 1).map(g => g.members.map(m => m.id));
      const res = await sendManualMatches(payload);
      if (res.error) throw new Error(res.error);
      
      alert(`Success! Emailed ${res.groupsCount} groups.`);
      router.refresh();
      setHasGenerated(false);
      setGroups([]);
    } catch (e: any) {
      alert(`Error sending emails: ${e.message}`);
    } finally {
      setIsSending(false);
    }
  };

  if (users.length === 0) {
    return (
      <div className="glass-card p-12 text-center rounded-2xl flex flex-col items-center justify-center">
        <Users className="w-12 h-12 text-text-muted mb-4" />
        <h3 className="text-xl font-bold text-text-primary">No Unmatched Users</h3>
        <p className="text-text-secondary mt-2">All accepted users have already been matched!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {!hasGenerated ? (
        <div className="glass-card p-8 rounded-2xl flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-text-primary">Ready to match?</h3>
            <p className="text-text-secondary">You have {users.length} unmatched users.</p>
          </div>
          <button 
            onClick={generateGroups}
            className="bg-brand-green-primary hover:bg-brand-green-accent text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors"
          >
            Generate Groups
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center bg-bg-surface p-4 rounded-xl border border-border-card">
            <span className="font-medium text-text-primary">Review your {groups.length} generated groups</span>
            <button 
              onClick={handleSendEmails}
              disabled={isSending}
              className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
              {isSending ? 'Sending...' : 'Approve & Send Emails'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {groups.map(group => (
              <div key={group.id} className="glass-card p-5 rounded-2xl shadow-sm border border-border-card">
                <h4 className="font-bold text-text-primary mb-3 flex items-center justify-between">
                  {group.id}
                  <span className="text-xs bg-brand-badge-bg text-brand-mint-text px-2 py-1 rounded-full">
                    {group.members.length} members
                  </span>
                </h4>
                <div className="flex flex-col gap-3">
                  {group.members.map(user => (
                    <div key={user.id} className="bg-bg-card p-3 rounded-lg border border-border-card flex flex-col gap-2">
                      <span className="font-medium text-sm truncate">{user.email}</span>
                      {user.interests && user.interests.length > 0 && (
                        <span className="text-xs text-text-muted truncate">
                          {user.interests.join(', ')}
                        </span>
                      )}
                      
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border-card">
                        <ArrowRightLeft className="w-3 h-3 text-text-muted" />
                        <select 
                          className="text-xs bg-bg-surface border-none focus:ring-0 text-text-secondary cursor-pointer"
                          value={group.id}
                          onChange={(e) => moveUser(user.id, e.target.value)}
                        >
                          {groups.map(g => (
                            <option key={g.id} value={g.id}>Move to {g.id}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                  {group.members.length === 0 && (
                    <span className="text-xs text-text-muted italic py-2">Empty group</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
