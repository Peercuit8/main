'use client';

import { useFormStatus } from 'react-dom';
import { Loader2, Save } from 'lucide-react';
import { saveEmailTemplate } from './actions';
import { useState, useRef } from 'react';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button 
      type="submit"
      disabled={pending}
      className="bg-brand-green-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md shadow-brand-green-primary/20 transition-all flex items-center justify-center gap-2 w-fit disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
      {pending ? 'Saving...' : 'Save Template'}
    </button>
  );
}

export function EmailTemplateForm({ initialSubject, initialBody }: { initialSubject: string, initialBody: string }) {
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const action = async (formData: FormData) => {
    setMessage(null);
    const result = await saveEmailTemplate(formData);
    if (result.error) {
      setMessage({ type: 'error', text: result.error });
    } else {
      setMessage({ type: 'success', text: 'Template saved successfully.' });
    }
  };

  return (
    <form action={action} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-text-secondary" htmlFor="subject">Subject Line</label>
        <input 
          id="subject"
          name="subject"
          type="text" 
          defaultValue={initialSubject}
          className="border border-border-card bg-bg-card text-text-primary p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green-primary transition-all w-full" 
          required 
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-text-secondary" htmlFor="body">HTML Body</label>
        <textarea 
          id="body"
          name="body"
          rows={6}
          defaultValue={initialBody}
          className="border border-border-card bg-bg-card text-text-primary p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green-primary transition-all w-full font-mono text-sm" 
          required 
        />
        <p className="text-xs text-text-muted">You can use basic HTML tags like &lt;strong&gt;, &lt;p&gt;, &lt;br&gt;, etc.</p>
      </div>

      <div className="mt-2 flex items-center gap-4">
        <SubmitButton />
        {message && (
          <span className={`text-sm font-medium ${message.type === 'success' ? 'text-brand-green-primary' : 'text-red-500'}`}>
            {message.text}
          </span>
        )}
      </div>
    </form>
  );
}
