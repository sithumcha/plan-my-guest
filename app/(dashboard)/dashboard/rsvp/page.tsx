'use client';

import { CheckCircle2, Clock, XCircle, Utensils, MessageCircleHeart } from 'lucide-react';

export default function RsvpTrackingPage() {
  const wishes = [
    { name: 'Nimal Perera', wish: 'Wishing Kasun & Dilhani a lifetime of happiness, joy, and prosperity together!', status: 'attending' },
    { name: 'Dr. Ruwan Wickrama', wish: 'Congratulations on your special day! Looking forward to celebrating with you.', status: 'attending' },
    { name: 'Kavindi Silva', wish: 'Warmest wishes on your wedding day!', status: 'pending' },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="pb-6 border-b border-slate-800">
        <span className="text-xs uppercase tracking-wider font-semibold text-gold-400">RSVP Analytics</span>
        <h1 className="font-serif text-3xl font-bold text-white mt-1">RSVP Response Tracking</h1>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Attending
            </span>
            <span className="font-bold text-white">184 Guests</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-400 w-[83%]" />
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-amber-400 flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> Pending Response
            </span>
            <span className="font-bold text-white">24 Guests</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-amber-400 w-[11%]" />
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-rose-400 flex items-center gap-1.5">
              <XCircle className="w-4 h-4" /> Declined
            </span>
            <span className="font-bold text-white">12 Guests</span>
          </div>
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-rose-400 w-[6%]" />
          </div>
        </div>
      </div>

      {/* Guest Wishes Board */}
      <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-4">
        <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
          <MessageCircleHeart className="w-5 h-5 text-rose-400" /> Warm Wishes from Confirmed Guests
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {wishes.map((w, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{w.name}</span>
                <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-semibold">
                  Confirmed Attending
                </span>
              </div>
              <p className="text-slate-300 italic">"{w.wish}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
