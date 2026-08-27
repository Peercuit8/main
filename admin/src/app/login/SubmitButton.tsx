'use client';

import { useFormStatus } from 'react-dom';
import { Loader2 } from 'lucide-react';

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit"
      disabled={pending}
      className="bg-brand-green-primary text-white p-3 rounded-lg hover:bg-brand-green-accent transition-colors font-medium shadow-md shadow-brand-green-primary/20 mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
      {pending ? 'Signing In...' : 'Sign In'}
    </button>
  );
}
