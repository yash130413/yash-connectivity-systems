import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Lock, Mail, Boxes, AlertCircle } from 'lucide-react';
import { login } from '@/lib/admin/auth';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get('email')).trim();
    const password = String(fd.get('password')).trim();

    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md animate-fade-up">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[var(--shadow-elevated)]">
              <Boxes className="h-6 w-6" />
            </span>
            <span className="font-display text-xl font-bold text-foreground">Yash Connectivity</span>
          </div>
          <p className="text-sm text-muted-foreground">Admin Panel</p>
        </div>

        {/* Card */}
        <div className="card-surface rounded-2xl p-8" style={{ transform: 'none' }}>
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-foreground">Welcome back</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in to access your admin dashboard</p>
          </div>

          {error && (
            <div className="mb-5 flex items-center gap-2.5 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3">
              <AlertCircle className="h-4 w-4 shrink-0 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</label>
              <div className="relative mt-1.5">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@example.com"
                  disabled={loading}
                  className="input-field pl-10"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</label>
              <div className="relative mt-1.5">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  disabled={loading}
                  className="input-field pl-10"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full mt-2 disabled:opacity-70"
            >
              {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in…</> : <>Sign In</>}
            </button>
          </form>
        </div>

        <p className="text-center mt-6 text-xs text-muted-foreground">
          Protected area · Yash Connectivity Systems
        </p>
      </div>
    </div>
  );
}
