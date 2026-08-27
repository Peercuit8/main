'use client';

import { useTransition } from 'react';
import { Trash2, Loader2 } from 'lucide-react';
import { deleteAdminUser } from './actions';

export function DeleteAdminButton({ userId, userEmail }: { userId: string, userEmail: string }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
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
      disabled={isPending}
      className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 p-2 rounded-lg transition-colors disabled:opacity-50"
      title="Delete Admin"
    >
      {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
    </button>
  );
}
