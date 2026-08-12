'use client';

import Link from 'next/link';
import { Heart, Sparkles, Menu, X, ArrowRight, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/lib/AuthContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();

  const userInitials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .substring(0, 2)
    : 'U';

  const dashboardPath = user?.role === 'admin' ? '/admin' : '/dashboard';

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#E8DEC8] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-[#5C332D] flex items-center justify-center shadow-md shadow-rosewood-900/10 group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 text-[#FAF6F0] fill-[#FAF6F0]" />
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#3A1E1A] group-hover:text-[#5C332D] transition-colors">
              PlanMyGuest<span className="text-[#8B483E]">.lk</span>
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-[#754038] font-semibold">
              Digital Wedding Suite
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5C332D]">
          <Link href="/features" className="hover:text-[#8B483E] transition-colors">
            Features
          </Link>
          <Link href="/templates" className="hover:text-[#8B483E] transition-colors flex items-center gap-1.5">
            Templates
            <span className="bg-[#F5E6E3] text-[#5C332D] text-[10px] px-2 py-0.5 rounded-full border border-[#D5A49B] font-bold">
              New
            </span>
          </Link>
          <Link href="/pricing" className="hover:text-[#8B483E] transition-colors">
            Pricing (LKR)
          </Link>
          <Link href="/blog" className="hover:text-[#8B483E] transition-colors">
            Wedding Planning Tips
          </Link>
          <Link href="/contact" className="hover:text-[#8B483E] transition-colors">
            Contact
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {!loading && user ? (
            <div className="flex items-center gap-3">
              <Link
                href={dashboardPath}
                className="flex items-center gap-2.5 bg-[#F5E6E3] hover:bg-[#EBD5D0] text-[#5C332D] font-semibold px-4 py-2 rounded-xl border border-[#D5A49B] shadow-sm transition-all text-sm"
              >
                <div className="w-6 h-6 rounded-full bg-[#5C332D] text-[#FAF6F0] font-bold text-xs flex items-center justify-center">
                  {userInitials}
                </div>
                <span className="max-w-[140px] truncate">{user.name}</span>
                <LayoutDashboard className="w-4 h-4 text-[#8B483E]" />
              </Link>
              <button
                onClick={logout}
                title="Sign Out"
                className="p-2 rounded-xl text-[#755D58] hover:text-[#5C332D] hover:bg-rose-50 border border-[#E8DEC8] transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm font-semibold text-[#5C332D] hover:text-[#3A1E1A] px-4 py-2 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="flex items-center gap-2 bg-[#5C332D] hover:bg-[#4A2823] text-white font-semibold px-5 py-2.5 rounded-xl shadow-md shadow-rosewood-900/15 transition-all text-sm"
              >
                <Sparkles className="w-4 h-4 text-gold-300" />
                Create Free Invitation
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#5C332D] hover:text-[#3A1E1A]"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-[#E8DEC8] flex flex-col gap-4 text-[#3A1E1A]">
          <Link href="/features" onClick={() => setMobileMenuOpen(false)}>
            Features
          </Link>
          <Link href="/templates" onClick={() => setMobileMenuOpen(false)}>
            Templates
          </Link>
          <Link href="/pricing" onClick={() => setMobileMenuOpen(false)}>
            Pricing
          </Link>
          <Link href="/blog" onClick={() => setMobileMenuOpen(false)}>
            Wedding Tips
          </Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
            Contact
          </Link>
          <div className="pt-2 flex flex-col gap-2">
            {!loading && user ? (
              <>
                <Link
                  href={dashboardPath}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-[#5C332D] text-white font-semibold flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" /> Go to Dashboard ({user.name})
                </Link>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full text-center py-2.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-800 font-semibold flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl border border-[#E8DEC8] font-semibold text-[#5C332D]"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-2.5 rounded-xl bg-[#5C332D] text-white font-semibold flex items-center justify-center gap-2"
                >
                  Create Free Invitation <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
