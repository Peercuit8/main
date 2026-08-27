'use client';

import { useFormStatus } from 'react-dom';
import { Loader2, UserPlus } from 'lucide-react';
import { createAdminUser } from './actions';
import { useRef, useState } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit"
      disabled={pending}
      className="bg-brand-green-primary text-white px-4 py-2 rounded-lg hover:bg-brand-green-accent transition-colors font-medium shadow-md shadow-brand-green-primary/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed h-full"
    >
      {pending ? <Loader2 className="w-4 h-4 animate-spin" /> : <UserPlus className="w-4 h-4" />}
      {pending ? 'Adding...' : 'Add Admin'}
    </button>
  );
}

export function AddAdminForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);

  const action = async (formData: FormData) => {
    setError(null);
    const result = await createAdminUser(formData);
    if (result.error) {
      setError(result.error);
    } else {
      formRef.current?.reset();
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl mb-8">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Add New Admin</h3>
      <form ref={formRef} action={action} className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="flex flex-col gap-2 flex-1 w-full">
          <label className="text-sm font-medium text-text-secondary" htmlFor="email">Email</label>
          <input 
            id="email"
            name="email"
            type="email" 
            placeholder="admin@peercuit.com" 
            className="border border-border-card bg-bg-card text-text-primary p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green-primary transition-all w-full" 
            required 
          />
        </div>
        <div className="flex flex-col gap-2 flex-1 w-full">
          <label className="text-sm font-medium text-text-secondary" htmlFor="password">Password</label>
          <input 
            id="password"
            name="password"
            type="password" 
            placeholder="••••••••" 
            className="border border-border-card bg-bg-card text-text-primary p-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green-primary transition-all w-full" 
            required 
          />
        </div>
        <div className="h-[46px] w-full md:w-auto">
          <SubmitButton />
        </div>
      </form>
      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
    </div>
  );
}
