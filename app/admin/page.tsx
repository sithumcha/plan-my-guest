'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Crown, CreditCard, Heart, Activity, ArrowRight } from 'lucide-react';

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalUsers: 148,
    activeWeddings: 124,
    totalRSVPsSent: 4890,
    monthlyRevenueLKR: 980000,
    monthlyRevenueUSD: 3400,
  });

  useEffect(() => {
    fetch('/api/admin')
      .then((res) => res.json())
      .then((data) => {
        if (data.stats) setStats(data.stats);
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 space-y-8 max-w-7xl mx-auto font-sans">
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold-400 flex items-center justify-center text-slate-950 font-bold">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-gold-400 uppercase tracking-widest">Platform Admin</span>
            <h1 className="font-serif text-3xl font-bold text-white">PlanMyGuest Owner Dashboard</h1>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <Link href="/admin/users" className="bg-slate-900 border border-slate-700 px-4 py-2 rounded-xl text-slate-200 hover:text-white">
            Manage Users
          </Link>
          <Link href="/admin/subscriptions" className="bg-gold-400 text-slate-950 font-bold px-4 py-2 rounded-xl">
            View Revenue & Subscriptions
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 uppercase font-semibold">Total Registered Couples</span>
          <div className="font-serif text-4xl font-bold text-white">{stats.totalUsers}</div>
          <span className="text-xs text-emerald-400 block font-medium">+18 new this week</span>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 uppercase font-semibold">Active Wedding Sites</span>
          <div className="font-serif text-4xl font-bold text-gold-300">{stats.activeWeddings}</div>
          <span className="text-xs text-slate-400 block">Published live</span>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 uppercase font-semibold">Total RSVPs Tracked</span>
          <div className="font-serif text-4xl font-bold text-emerald-400">{stats.totalRSVPsSent}</div>
          <span className="text-xs text-slate-400 block">Across all sites</span>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-800 space-y-2">
          <span className="text-xs text-slate-400 uppercase font-semibold">PayHere Monthly LKR Revenue</span>
          <div className="font-serif text-3xl font-bold text-gold-400">Rs. {stats.monthlyRevenueLKR.toLocaleString()}</div>
          <span className="text-xs text-emerald-400 block font-medium">${stats.monthlyRevenueUSD} USD Global</span>
        </div>
      </div>
    </div>
  );
}
