'use client';

import { useTransition, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toggleApplicationsStatus } from './actions';

export function ApplicationToggle({ initialStatus }: { initialStatus: boolean }) {
  const [isOpen, setIsOpen] = useState(initialStatus);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    const newStatus = !isOpen;
    setIsOpen(newStatus);
    
    startTransition(async () => {
      const res = await toggleApplicationsStatus(newStatus);
      if (res.error) {
        alert(res.error);
        setIsOpen(isOpen); // revert on error
      }
    });
  };

  return (
    <div className="flex items-center gap-4">
      <button 
        onClick={handleToggle}
        disabled={isPending}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-green-primary focus:ring-offset-2 ${isOpen ? 'bg-brand-green-primary' : 'bg-gray-300 dark:bg-gray-700'}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isOpen ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-text-primary">
          {isOpen ? 'Applications are Open' : 'Applications are Closed'}
        </span>
        {isPending && <Loader2 className="w-4 h-4 animate-spin text-text-muted" />}
      </div>
    </div>
  );
}
