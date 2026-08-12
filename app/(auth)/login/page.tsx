'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { refetchAuth } = useAuth();
  const [email, setEmail] = useState('demo@planmyguest.lk');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        await refetchAuth();
        if (data.user?.role === 'admin' || email.includes('admin')) {
          router.push('/admin');
        } else {
          router.push('/dashboard');
        }
        router.refresh();
      } else {
        setError(data.error || 'Login failed. Please try demo credentials.');
      }
    } catch {
      await refetchAuth();
      router.push('/dashboard');
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card p-8 rounded-3xl border border-[#E8DEC8] bg-white shadow-xl space-y-6">
      <div className="text-center space-y-1">
        <h1 className="font-serif text-3xl font-bold text-[#3A1E1A]">Welcome Back</h1>
        <p className="text-xs text-[#755D58]">Log in to manage your wedding invitation site</p>
      </div>

      {error && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2 font-semibold">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div>
          <label className="block text-[#3A1E1A] font-semibold mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8C746E]" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#E8DEC8] text-[#3A1E1A] font-medium rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#5C332D]"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-[#3A1E1A] font-semibold">Password</label>
            <Link href="/forgot-password" className="text-[#5C332D] font-bold hover:underline text-[11px]">
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8C746E]" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#E8DEC8] text-[#3A1E1A] font-medium rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#5C332D]"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-[#5C332D] hover:bg-[#4A2823] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all"
        >
          {loading ? 'Authenticating...' : 'Sign In to Dashboard'} <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="p-3 bg-[#F5E6E3] border border-[#D5A49B] rounded-xl text-[11px] text-[#5C332D] text-center font-medium">
        💡 Demo Account: <span className="font-mono font-bold">demo@planmyguest.lk</span>
      </div>

      <div className="text-center text-xs text-[#755D58] pt-2 border-t border-[#E8DEC8]">
        Don’t have a wedding site yet?{' '}
        <Link href="/signup" className="text-[#5C332D] font-bold hover:underline">
          Create One Free
        </Link>
      </div>
    </div>
  );
}
