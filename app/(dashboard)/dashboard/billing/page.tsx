'use client';

import { useState } from 'react';
import { Sparkles, CreditCard, Gift, Download, Zap, Bell, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function BillingPage() {
  const [loading, setLoading] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const handlePayHereCheckout = async (planType: 'pro_lk' | 'pro_global') => {
    setLoading(true);
    try {
      const res = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planType }),
      });

      const data = await res.json();
      if (res.ok && data.payhereConfig) {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = data.payhereConfig.checkoutUrl;

        Object.entries(data.payhereConfig).forEach(([key, value]) => {
          if (key !== 'checkoutUrl') {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = value as string;
            form.appendChild(input);
          }
        });

        document.body.appendChild(form);
        form.submit();
      } else {
        alert(data.error || 'Failed to initiate PayHere checkout.');
      }
    } catch {
      alert('PayHere checkout error. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 font-sans bg-[#FFF8F0] min-h-screen">
      {/* Top Header / Breadcrumb */}
      <div className="flex items-center justify-between pb-4">
        <div className="text-xs font-semibold text-[#504444] space-x-1">
          <span>Settings</span>
          <span>/</span>
          <span className="text-[#353023] font-bold">Billing</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full bg-white border border-[#EBE2CE] text-[#504444] hover:text-[#353023] relative">
            <Bell className="w-4 h-4" />
            <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1 right-1" />
          </button>
          <div className="w-8 h-8 rounded-full bg-[#F5E6E3] border border-[#D5A49B] text-[#785655] font-serif font-bold text-xs flex items-center justify-center">
            SJ
          </div>
        </div>
      </div>

      {/* Main Page Title */}
      <header className="mb-6">
        <h1 className="font-serif text-4xl font-bold text-[#353023]">Billing & Subscription</h1>
        <p className="text-sm text-[#504444] mt-2 font-normal">
          Manage your plan, payment methods, and billing history.
        </p>
      </header>

      {/* Grid Layout: Plan Details + Payment Method & Promo Code */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3 width): Current Plan Card */}
        <div className="lg:col-span-2 bg-white border border-[#EBE2CE] rounded-2xl p-8 space-y-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-2xl font-bold text-[#353023]">Essential Plan</h2>
                  <span className="bg-[#FAF3E8] border border-[#EBE2CE] text-[#785655] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Current
                  </span>
                </div>
                <p className="text-xs text-[#504444] mt-2">
                  Perfect for intimate weddings and simple guest management.
                </p>
              </div>
              <div className="text-right">
                <span className="font-serif text-3xl font-bold text-[#353023]">$15</span>
                <span className="text-xs text-[#504444]">/mo</span>
              </div>
            </div>

            {/* Guest Progress Bar */}
            <div className="mt-8 space-y-2">
              <div className="w-full bg-[#FAF3E8] h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#785655] h-full rounded-full w-[75%]" />
              </div>
              <div className="flex items-center justify-between text-xs text-[#504444] font-medium">
                <span>75 / 100 Guests</span>
                <span>Renews Oct 24</span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4 pt-6 border-t border-[#EBE2CE]/60">
            <button
              onClick={() => handlePayHereCheckout('pro_lk')}
              disabled={loading}
              className="flex-1 bg-[#785655] hover:bg-[#5E3F3E] text-white font-medium text-xs py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Zap className="w-4 h-4 fill-white" />
              {loading ? 'Processing...' : 'Upgrade to Pro'}
            </button>
            <button
              onClick={() => alert('Plan cancellation window opens 30 days before renewal.')}
              className="flex-1 bg-white border border-[#D4C3C2] text-[#1F1B0F] hover:bg-[#FFF8F0] font-medium text-xs py-3 px-4 rounded-xl transition-colors"
            >
              Cancel Plan
            </button>
          </div>
        </div>

        {/* Right Column (1/3 width): Payment Method & Promo Code Cards */}
        <div className="space-y-6">
          {/* Payment Method Card */}
          <div className="bg-white border border-[#EBE2CE] rounded-2xl p-6 space-y-4 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#353023] block">
              Payment Method
            </span>

            <div className="bg-[#F7EDD9] border border-[#EBE2CE] rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white border border-[#EBE2CE] px-2 py-1 rounded text-[10px] font-bold tracking-wider text-[#353023]">
                  VISA
                </div>
                <div>
                  <span className="font-mono text-xs font-bold text-[#353023]">•••• 4242</span>
                  <span className="text-[10px] text-[#504444] block">Expires 12/25</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => alert('Payment method update popup')}
              className="text-xs text-[#785655] font-semibold hover:underline flex items-center gap-1.5"
            >
              ✏️ Update payment method
            </button>
          </div>

          {/* Promo Code Card */}
          <div className="bg-[#F5E6E3] border border-[#D5A49B] rounded-2xl p-6 text-center space-y-3 shadow-sm">
            <div className="w-10 h-10 rounded-full bg-white text-[#785655] flex items-center justify-center mx-auto shadow-sm">
              <Gift className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-[#353023] text-xs">Have a promo code?</h4>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="ENTER CODE"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="w-full bg-white border border-[#EBE2CE] text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-[#785655]"
              />
              <button
                onClick={() => setPromoApplied(true)}
                className="bg-[#785655] text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-[#5E3F3E]"
              >
                Apply
              </button>
            </div>
            {promoApplied && (
              <span className="text-[11px] font-bold text-emerald-700 block">✓ Code Applied! 10% Discount active.</span>
            )}
          </div>
        </div>
      </div>

      {/* Billing History Section */}
      <section className="bg-white rounded-2xl border border-[#EBE2CE] overflow-hidden shadow-sm">
        <div className="p-6 border-b border-[#EBE2CE]">
          <h3 className="font-serif text-2xl font-bold text-[#353023]">Billing History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#353023]">
            <thead className="bg-[#FFF8F0] text-[11px] uppercase tracking-wider font-bold text-[#504444] border-b border-[#EBE2CE]">
              <tr>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBE2CE]/60">
              {[
                { date: 'Oct 24, 2023', desc: 'Essential Plan - Monthly', amount: '$15.00', status: 'Paid' },
                { date: 'Sep 24, 2023', desc: 'Essential Plan - Monthly', amount: '$15.00', status: 'Paid' },
                { date: 'Aug 24, 2023', desc: 'Essential Plan - Monthly', amount: '$15.00', status: 'Paid' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-[#FFF8F0]/60 transition-colors">
                  <td className="px-6 py-4 font-medium">{row.date}</td>
                  <td className="px-6 py-4 text-[#504444]">{row.desc}</td>
                  <td className="px-6 py-4 font-bold">{row.amount}</td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[10px] font-bold">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => alert(`Downloading invoice for ${row.date}`)}
                      className="p-1.5 rounded-lg text-[#785655] hover:bg-[#F5E6E3] transition-colors"
                      title="Download PDF Invoice"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
