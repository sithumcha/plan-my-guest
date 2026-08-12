'use client';

import Link from 'next/link';
import { Sparkles, ArrowRight, CheckCircle2, Heart } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-12 pb-20 px-6 overflow-hidden bg-[#FAF6F0]">
      {/* Background Decorative Subtle Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#F5E6E3] blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center space-y-8 relative z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#F5E6E3] border border-[#D5A49B] px-4 py-2 rounded-full text-[#5C332D] text-xs font-bold uppercase tracking-widest shadow-sm">
          <Sparkles className="w-4 h-4 text-[#8B483E]" />
          Sri Lanka's #1 Digital Wedding Suite
        </div>

        {/* Main Title */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[#3A1E1A] leading-[1.1] max-w-5xl mx-auto">
          Your Perfect Day, <br className="hidden sm:inline" />
          <span className="text-[#5C332D] italic">Planned Perfectly.</span>
        </h1>

        {/* Subtitle */}
        <p className="text-[#755D58] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
          Effortless wedding website creation, automated guest list management, drag & drop seating charts, and direct WhatsApp invitations for Sri Lankan & global couples.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/signup"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#5C332D] hover:bg-[#4A2823] text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-rosewood-900/15 transition-all text-base"
          >
            Start Free Website
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/vishmi-sanjana"
            target="_blank"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-[#FAF6F0] border border-[#E8DEC8] text-[#5C332D] font-bold px-8 py-4 rounded-2xl transition-colors text-base shadow-sm"
          >
            View Live Invitation Demo
          </Link>
        </div>

        {/* Feature Checkmarks */}
        <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs md:text-sm text-[#755D58] font-semibold">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#5C332D]" /> PayHere Sri Lanka Gateway
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" /> WhatsApp Direct Invites
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#5C332D]" /> Drag & Drop Seating Chart
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-[#8B483E]" /> Mobile Seat Finder
          </span>
        </div>

        {/* Hero Product Screenshot Showcase */}
        <div className="pt-12 max-w-5xl mx-auto">
          <div className="glass-panel p-3 rounded-3xl border border-[#E8DEC8] shadow-xl bg-white">
            <div className="bg-[#FAF5EF] rounded-2xl border border-[#E8DEC8] overflow-hidden relative">
              <div className="h-10 bg-[#F5EBE1] border-b border-[#E8DEC8] px-4 flex items-center gap-2 text-xs text-[#755D58]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <span className="ml-4 font-mono text-[11px] text-[#5C332D] font-semibold">
                  https://plansite.lk/vishmi-sanjana
                </span>
              </div>
              <div className="p-8 md:p-12 text-left bg-gradient-to-b from-[#FFFDF9] to-[#FAF6F0] space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-3xl font-bold text-[#3A1E1A]">Vishmi & Sanjana</span>
                  <span className="bg-[#F5E6E3] text-[#5C332D] text-xs px-3 py-1 rounded-full font-bold border border-[#D5A49B]">
                    Live Digital Invitation
                  </span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white border border-[#E8DEC8] p-4 rounded-xl shadow-sm">
                    <span className="text-xs text-[#8C746E] font-medium">Reception Venue</span>
                    <p className="font-bold text-[#3A1E1A]">Shangri-La Hotel, Colombo</p>
                  </div>
                  <div className="bg-white border border-[#E8DEC8] p-4 rounded-xl shadow-sm">
                    <span className="text-xs text-[#8C746E] font-medium">RSVP Confirmed</span>
                    <p className="font-bold text-emerald-700">184 / 220 Guests Attending</p>
                  </div>
                  <div className="bg-white border border-[#E8DEC8] p-4 rounded-xl shadow-sm">
                    <span className="text-xs text-[#8C746E] font-medium">Seating Assignment</span>
                    <p className="font-bold text-[#5C332D]">Table 1 - VIP Royal Poruwa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
