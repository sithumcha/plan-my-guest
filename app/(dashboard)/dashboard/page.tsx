'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, Users, Mail, Edit3, UserPlus, Bell, ArrowRight, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

export default function DashboardOverviewPage() {
  const [copied, setCopied] = useState(false);
  const { user, wedding } = useAuth();
  
  const welcomeName = wedding?.groomName || user?.name?.split(' ')[0] || 'User';
  const displayCoupleName = wedding?.groomName && wedding?.brideName 
    ? `${wedding.groomName} & ${wedding.brideName}` 
    : user?.name || 'User';

  const userInitials = displayCoupleName.includes('&')
    ? displayCoupleName.split('&').map((n) => n.trim().charAt(0)).join('').toUpperCase().substring(0, 2)
    : (user?.name || 'U').split(' ').map((n) => n.charAt(0)).join('').toUpperCase().substring(0, 2);

  const formattedWeddingDate = wedding?.weddingDate 
    ? new Date(wedding.weddingDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : 'October 24, 2024';

  const slug = wedding?.slug || 'vishmi-sanjana';
  const fullUrl = `https://plansite.lk/${slug}`;

  return (
    <div className="max-w-7xl mx-auto space-y-8 font-sans bg-[#FFF8F0] min-h-screen pb-16">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-4">
        <h1 className="font-serif text-3xl font-bold text-[#353023]">Dashboard</h1>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-white border border-[#EBE2CE] text-[#504444] hover:text-[#353023] relative shadow-sm">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1 right-1" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#F5E6E3] border border-[#D5A49B] text-[#785655] font-serif font-bold text-xs flex items-center justify-center">
            {userInitials}
          </div>
        </div>
      </div>

      {/* Main Greeting Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2">
        <div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#353023]">Welcome Back, {welcomeName}</h2>
          <p className="text-sm text-[#504444] mt-1 font-normal">
            Here is a quick overview of your wedding planning progress.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/website-builder"
            className="bg-white border border-[#D4C3C2] text-[#1F1B0F] hover:bg-[#FAF6F0] font-semibold text-xs px-5 py-3 rounded-xl shadow-sm transition-colors flex items-center gap-2"
          >
            <Edit3 className="w-4 h-4 text-[#785655]" /> Edit Site
          </Link>
          <Link
            href="/dashboard/guests"
            className="bg-[#785655] hover:bg-[#5E3F3E] text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-sm transition-colors flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" /> Add Guest
          </Link>
        </div>
      </div>

      {/* Top 3 Stat Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: DAYS UNTIL WEDDING */}
        <div className="bg-gradient-to-br from-[#FFFDF9] to-[#F7EDD9] border border-[#EBE2CE] rounded-2xl p-6 shadow-sm flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-[#F5E6E3] border border-[#D5A49B] text-[#785655] flex items-center justify-center flex-shrink-0 shadow-sm">
            <Heart className="w-6 h-6 fill-[#785655]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#504444]">
              DAYS UNTIL WEDDING
            </span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="font-serif text-4xl font-bold text-[#353023]">142</span>
              <span className="text-xs font-semibold text-[#504444]">Days</span>
            </div>
            <span className="text-xs text-[#827473] mt-0.5 block">{formattedWeddingDate}</span>
          </div>
        </div>

        {/* Card 2: TOTAL GUESTS */}
        <div className="bg-white border border-[#EBE2CE] rounded-2xl p-6 shadow-sm flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#504444]">
              TOTAL GUESTS
            </span>
            <div className="font-serif text-4xl font-bold text-[#353023] mt-1">150</div>
            <span className="text-xs text-[#827473] mt-1 block">Invited across 75 parties</span>
          </div>
          <div className="p-3 bg-[#FAF6F0] rounded-xl text-[#785655]">
            <Users className="w-5 h-5" />
          </div>
        </div>

        {/* Card 3: RSVP STATUS */}
        <div className="bg-white border border-[#EBE2CE] rounded-2xl p-6 shadow-sm flex items-start justify-between">
          <div className="w-full">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#504444]">
              RSVP STATUS
            </span>
            <div className="flex items-center justify-between pt-3">
              <div>
                <span className="font-serif text-3xl font-bold text-[#353023] block">85</span>
                <span className="text-[11px] text-[#827473]">Confirmed</span>
              </div>
              <div className="h-8 w-[1px] bg-[#EBE2CE]" />
              <div>
                <span className="font-serif text-3xl font-bold text-[#353023] block">65</span>
                <span className="text-[11px] text-[#827473]">Pending</span>
              </div>
            </div>
          </div>
          <div className="p-3 bg-[#FAF6F0] rounded-xl text-[#785655] ml-4">
            <Mail className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Bottom Row: RSVP Breakdown Donut Chart + Recent Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* RSVP Breakdown Donut Chart Card (Left - 1/3) */}
        <div className="bg-white border border-[#EBE2CE] rounded-2xl p-6 space-y-6 shadow-sm flex flex-col justify-between">
          <h3 className="font-serif text-2xl font-bold text-[#353023]">RSVP Breakdown</h3>

          {/* Donut Chart Visualizer */}
          <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#F7EDD9]"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#785655]"
                strokeDasharray="56, 100"
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-center">
              <span className="font-serif text-3xl font-bold text-[#353023] block leading-none">56%</span>
              <span className="text-[10px] text-[#827473] font-medium block mt-1">Attending</span>
            </div>
          </div>

          {/* Chart Legend */}
          <div className="flex items-center justify-center gap-6 text-xs text-[#504444] font-medium pt-2 border-t border-[#EBE2CE]/60">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#785655]" /> Confirmed (85)
            </span>
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#F7EDD9] border border-[#EBE2CE]" /> Pending (65)
            </span>
          </div>
        </div>

        {/* Recent Activity Feed Table Card (Right - 2/3) */}
        <div className="lg:col-span-2 bg-white border border-[#EBE2CE] rounded-2xl p-6 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-[#353023]">Recent Activity</h3>
            <Link href="/dashboard/rsvp" className="text-xs font-bold text-[#785655] hover:underline">
              View All
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#353023]">
              <thead className="bg-[#FFF8F0] text-[10px] uppercase tracking-wider font-bold text-[#504444] border-b border-[#EBE2CE]">
                <tr>
                  <th className="px-4 py-3">GUEST NAME</th>
                  <th className="px-4 py-3">ACTION</th>
                  <th className="px-4 py-3">STATUS</th>
                  <th className="px-4 py-3 text-right">TIME</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE2CE]/60">
                {[
                  { name: 'Michael & Jane Doe', action: 'Submitted RSVP', status: 'Attending', color: 'bg-emerald-100 text-emerald-800', time: '2 hrs ago' },
                  { name: 'Eleanor Rigby', action: 'Viewed Website', status: 'Pending', color: 'bg-[#F7EDD9] text-[#755353]', time: '5 hrs ago' },
                  { name: 'Robert Smith', action: 'Submitted RSVP', status: 'Declined', color: 'bg-rose-100 text-rose-800', time: '1 day ago' },
                  { name: 'The Johnson Family', action: 'Added Meal Prefs', status: 'Attending', color: 'bg-emerald-100 text-emerald-800', time: '2 days ago' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-[#FFF8F0]/60 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-[#353023]">{row.name}</td>
                    <td className="px-4 py-3.5 text-[#504444]">{row.action}</td>
                    <td className="px-4 py-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${row.color}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right text-[#827473]">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
