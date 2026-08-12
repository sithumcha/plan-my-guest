'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, Mail, Lock, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const { refetchAuth } = useAuth();
  const [coupleNames, setCoupleNames] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: coupleNames || 'Kasun & Dilhani',
          email,
          password,
        }),
      });

      await refetchAuth();
      router.push('/dashboard');
      router.refresh();
    } catch {
      await refetchAuth();
      router.push('/dashboard');
      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EBE2CE] p-8 md:p-10 shadow-[0_10px_30px_-10px_rgba(247,202,201,0.3)] space-y-6 text-center animate-[fadeIn_0.3s_ease-out]">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-[#785655]">Plan My Guest</h1>
        <p className="text-xs text-[#504444] font-medium">Start planning your perfect celebration.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-left text-xs">
        {/* Couple Names */}
        <div className="space-y-1">
          <label className="block text-[#1F1B0F] font-semibold">Couple Names</label>
          <div className="relative">
            <Heart className="w-4 h-4 absolute left-3.5 top-3.5 text-[#827473]" />
            <input
              type="text"
              required
              placeholder="e.g. Sarah & James"
              value={coupleNames}
              onChange={(e) => setCoupleNames(e.target.value)}
              className="w-full bg-[#FFF8F0] border border-[#D4C3C2] text-[#1F1B0F] font-medium rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#785655]"
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-1">
          <label className="block text-[#1F1B0F] font-semibold">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-[#827473]" />
            <input
              type="email"
              required
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FFF8F0] border border-[#D4C3C2] text-[#1F1B0F] font-medium rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#785655]"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="block text-[#1F1B0F] font-semibold">Password</label>
          <div className="relative">
            <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-[#827473]" />
            <input
              type="password"
              required
              placeholder="Create a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#FFF8F0] border border-[#D4C3C2] text-[#1F1B0F] font-medium rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#785655]"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 bg-[#785655] hover:bg-[#5E3F3E] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all mt-2"
        >
          {loading ? 'Creating Account...' : 'Create Account'} <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center justify-center py-2">
        <div className="w-full border-t border-[#EBE2CE]" />
        <span className="bg-white px-3 text-[11px] text-[#827473] relative z-10 font-medium">
          or continue with
        </span>
      </div>

      {/* Google Auth Button */}
      <button
        onClick={() => router.push('/dashboard')}
        className="w-full py-3 bg-[#F7EDD9]/80 hover:bg-[#F7EDD9] border border-[#EBE2CE] text-[#1F1B0F] font-semibold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#EA4335"
            d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
          />
          <path
            fill="#4285F4"
            d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
          />
          <path
            fill="#FBBC05"
            d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 17C3.7 20.7 7.5 24 12 24z"
          />
        </svg>
        Google
      </button>

      {/* Footer Badges & Link */}
      <div className="pt-2 space-y-3 border-t border-[#EBE2CE]/60 text-[11px] text-[#827473]">
        <div className="flex items-center justify-center gap-4">
          <span className="flex items-center gap-1">
            <Lock className="w-3 h-3 text-[#785655]" /> Secure Data
          </span>
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-emerald-700" /> Privacy First
          </span>
        </div>
        <p>
          Already have an account?{' '}
          <Link href="/login" className="text-[#785655] font-bold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
