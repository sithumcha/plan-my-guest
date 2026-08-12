'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="glass-card p-8 rounded-3xl border border-[#E8DEC8] bg-white shadow-xl space-y-6">
      <div className="text-center space-y-1">
        <h1 className="font-serif text-3xl font-bold text-[#3A1E1A]">Reset Password</h1>
        <p className="text-xs text-[#755D58]">Enter your email to receive password reset instructions</p>
      </div>

      {sent ? (
        <div className="text-center py-6 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
          <p className="text-[#3A1E1A] text-sm font-bold">Reset Link Sent!</p>
          <p className="text-xs text-[#755D58]">Check your inbox ({email}) for instructions.</p>
          <Link href="/login" className="inline-block text-xs font-bold text-[#5C332D] hover:underline pt-2">
            Return to Login
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#3A1E1A] font-semibold mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="couple@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#FAF6F0] border border-[#E8DEC8] text-[#3A1E1A] font-medium rounded-xl px-4 py-3 focus:outline-none focus:border-[#5C332D]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#5C332D] hover:bg-[#4A2823] text-white font-bold rounded-xl text-sm shadow-md"
          >
            Send Password Reset Link
          </button>
        </form>
      )}

      <div className="text-center text-xs text-[#755D58] pt-2 border-t border-[#E8DEC8]">
        <Link href="/login" className="inline-flex items-center gap-1.5 text-[#5C332D] font-bold hover:underline">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
        </Link>
      </div>
    </div>
  );
}
