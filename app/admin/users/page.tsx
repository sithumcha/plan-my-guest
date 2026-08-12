import Link from 'next/link';
import { ArrowLeft, Users, Shield } from 'lucide-react';

export default function AdminUsersPage() {
  const users = [
    { id: '1', name: 'Sanjana & Vishmi', email: 'sanjana@gmail.com', plan: 'Sri Lanka Pro (PayHere)', registered: 'August 01, 2026', slug: 'vishmi-sanjana' },
    { id: '2', name: 'Kasun & Dilhani', email: 'kasun@gmail.com', plan: 'Free', registered: 'August 05, 2026', slug: 'kasun-dilhani' },
    { id: '3', name: 'Kavinda & Thilini', email: 'kavinda@gmail.com', plan: 'Global Pro ($59)', registered: 'July 28, 2026', slug: 'kavinda-thilini' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 space-y-8 max-w-7xl mx-auto font-sans">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Admin Overview
      </Link>

      <div className="pb-4 border-b border-slate-800">
        <h1 className="font-serif text-3xl font-bold text-white">Registered Users & Couple Accounts</h1>
      </div>

      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Couple Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Active Plan</th>
              <th className="px-6 py-4">Invitation Slug</th>
              <th className="px-6 py-4">Joined Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-slate-900/50">
                <td className="px-6 py-4 font-bold text-white">{u.name}</td>
                <td className="px-6 py-4 font-mono text-slate-400">{u.email}</td>
                <td className="px-6 py-4 text-gold-300 font-semibold">{u.plan}</td>
                <td className="px-6 py-4 font-mono text-emerald-400">plansite.lk/{u.slug}</td>
                <td className="px-6 py-4 text-slate-400">{u.registered}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
