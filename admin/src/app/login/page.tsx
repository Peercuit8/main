import { login } from './actions'
import { LockKeyhole } from 'lucide-react'
import { SubmitButton } from './SubmitButton'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ message: string }> }) {
  const { message } = await searchParams;

  return (
    <div className="flex h-screen items-center justify-center bg-primary relative overflow-hidden">
      {/* Background flourishes */}
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern pointer-events-none" />
      <div className="absolute w-full h-full radial-glow-emerald pointer-events-none" />
      <div className="absolute w-full h-full radial-glow-green pointer-events-none" />

      <form 
        action={login}
        className="z-10 flex flex-col gap-6 w-[400px] glass-card glass-card-hover p-10 rounded-2xl relative"
      >
        <div className="flex flex-col items-center mb-4">
          <div className="bg-brand-mint-bg p-3 rounded-full mb-4 ring-1 ring-brand-badge-border">
            <LockKeyhole className="w-8 h-8 text-brand-mint-text" />
          </div>
          <h1 className="text-2xl font-bold text-center gradient-text-highlight">Admin Login</h1>
          <p className="text-text-muted text-sm mt-2 text-center">Enter your credentials to access the Peercuit dashboard</p>
        </div>

        {message && (
          <div className="bg-red-50 text-red-600 p-3 rounded text-sm text-center border border-red-200">
            {message}
          </div>
        )}

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-text-secondary" htmlFor="email">Email</label>
          <input 
            id="email"
            name="email"
            type="email" 
            placeholder="you@peercuit.com" 
            className="border border-border-card bg-bg-card text-text-primary p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green-primary transition-all" 
            required 
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-text-secondary" htmlFor="password">Password</label>
          <input 
            id="password"
            name="password"
            type="password" 
            placeholder="••••••••" 
            className="border border-border-card bg-bg-card text-text-primary p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green-primary transition-all" 
            required 
          />
        </div>

        <SubmitButton />
      </form>
    </div>
  )
}

