'use client';

import { useTransition } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { deleteAdminUser } from './actions';

export function DeleteAdminButton({ userId, userEmail, isCurrentUser }: { userId: string, userEmail: string, isCurrentUser?: boolean }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (isCurrentUser) {
      alert("You cannot delete your own admin account.");
      return;
    }
    if (confirm(`Are you sure you want to delete the admin ${userEmail}?`)) {
      startTransition(async () => {
        const result = await deleteAdminUser(userId);
        if (result.error) {
          alert(`Error deleting user: ${result.error}`);
        }
      });
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isPending || isCurrentUser}
      className={`p-2 rounded-lg transition-colors ${
        isCurrentUser 
          ? 'text-gray-400 bg-gray-100 dark:bg-gray-800 cursor-not-allowed' 
          : 'text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20'
      }`}
      title="Delete Admin"
    >
      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
