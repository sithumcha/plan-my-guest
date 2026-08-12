import Link from 'next/link';
import { ArrowLeft, CreditCard } from 'lucide-react';

export default function AdminSubscriptionsPage() {
  const transactions = [
    { id: 'tx_101', user: 'Sanjana & Vishmi', amount: 'Rs. 9,900 LKR', gateway: 'PayHere (Sampath Vishwa)', date: 'August 01, 2026', status: 'Completed' },
    { id: 'tx_102', user: 'Kavinda & Thilini', amount: '$59 USD', gateway: 'Stripe International', date: 'July 28, 2026', status: 'Completed' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8 space-y-8 max-w-7xl mx-auto font-sans">
      <Link href="/admin" className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Admin Overview
      </Link>

      <div className="pb-4 border-b border-slate-800">
        <h1 className="font-serif text-3xl font-bold text-white">Payment & Subscription Transactions</h1>
      </div>

      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">Transaction ID</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Gateway</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-900/50">
                <td className="px-6 py-4 font-mono text-slate-400">{tx.id}</td>
                <td className="px-6 py-4 font-bold text-white">{tx.user}</td>
                <td className="px-6 py-4 font-mono text-gold-300 font-bold">{tx.amount}</td>
                <td className="px-6 py-4 text-slate-300">{tx.gateway}</td>
                <td className="px-6 py-4 text-slate-400">{tx.date}</td>
                <td className="px-6 py-4 font-bold text-emerald-400">{tx.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
