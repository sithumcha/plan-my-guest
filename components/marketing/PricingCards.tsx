'use client';

import { useState } from 'react';
import { Check, Sparkles, CreditCard, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function PricingCards() {
  const [currency, setCurrency] = useState<'LKR' | 'USD'>('LKR');

  const plans = [
    {
      name: 'Free Invitation',
      price: currency === 'LKR' ? 'Rs. 0' : '$0',
      period: 'Forever Free',
      description: 'Perfect for intimate gatherings and getting started.',
      features: [
        '1 Digital Wedding Website Template',
        'Up to 30 Guest RSVPs',
        'Basic Countdown Timer',
        'Public Seat Finder',
        'Standard Email RSVPs',
      ],
      popular: false,
      buttonText: 'Get Started Free',
      href: '/signup',
    },
    {
      name: 'Sri Lanka Luxury Pro',
      price: currency === 'LKR' ? 'Rs. 9,900' : '$32',
      period: 'One-time Payment for 1 Year',
      description: 'Our most popular plan for Sri Lankan weddings & couples.',
      features: [
        'All 4 Luxury Templates (Royal, Modern, Classic, Boho)',
        'Unlimited Guest RSVPs',
        'Interactive Drag & Drop Seating Chart',
        'Direct WhatsApp Invitation Dispatcher',
        'Custom Theme Colors & Photos Gallery',
        'Cash Gift Registry & Bank Details',
        'PayHere Instant Checkout (LKR Credit/Debit/EzCash)',
      ],
      popular: true,
      buttonText: 'Upgrade to Pro (PayHere)',
      href: '/signup?plan=pro',
    },
    {
      name: 'Global Premium',
      price: currency === 'LKR' ? 'Rs. 18,500' : '$59',
      period: 'One-time Payment for 1 Year',
      description: 'Ideal for destination weddings & international guests.',
      features: [
        'Everything in Luxury Pro',
        'Multi-currency RSVP tracking',
        'Priority WhatsApp Cloud API integration',
        'Custom Subdomain / Domain link',
        'Dedicated Wedding Concierge Support',
      ],
      popular: false,
      buttonText: 'Choose Global Plan',
      href: '/signup?plan=global',
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto space-y-12 bg-[#FAF6F0]">
      {/* Header & Currency Switcher */}
      <div className="text-center space-y-4">
        <span className="text-xs uppercase tracking-widest text-[#5C332D] font-bold">Transparent Pricing</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#3A1E1A]">Simple Pricing for Your Perfect Day</h2>
        <p className="text-[#755D58] text-sm max-w-xl mx-auto">
          No hidden monthly subscriptions. Pay once and keep your wedding site active for a full year.
        </p>

        {/* Currency Switcher Toggle */}
        <div className="pt-4 flex items-center justify-center">
          <div className="bg-white border border-[#E8DEC8] p-1.5 rounded-2xl flex items-center gap-2 shadow-sm">
            <button
              onClick={() => setCurrency('LKR')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                currency === 'LKR'
                  ? 'bg-[#5C332D] text-white shadow-sm'
                  : 'text-[#755D58] hover:text-[#3A1E1A]'
              }`}
            >
              Sri Lanka (LKR Rs.)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                currency === 'USD'
                  ? 'bg-[#5C332D] text-white shadow-sm'
                  : 'text-[#755D58] hover:text-[#3A1E1A]'
              }`}
            >
              Global (USD $)
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`p-8 rounded-3xl border flex flex-col justify-between relative transition-all ${
              plan.popular
                ? 'border-[#D5A49B] bg-[#F5E6E3] shadow-xl shadow-rosewood-900/10'
                : 'border-[#E8DEC8] bg-white shadow-sm'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#5C332D] text-white font-bold text-[11px] uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                Most Popular in Sri Lanka
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#3A1E1A]">{plan.name}</h3>
                <p className="text-xs text-[#755D58] mt-1">{plan.description}</p>
              </div>

              <div>
                <div className="font-serif text-4xl font-bold text-[#5C332D]">{plan.price}</div>
                <span className="text-xs text-[#8C746E]">{plan.period}</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-[#E8DEC8]">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#3A1E1A] font-medium">
                    <Check className="w-4 h-4 text-[#5C332D] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <Link
                href={plan.href}
                className={`w-full block text-center py-3.5 px-6 rounded-2xl font-bold text-sm transition-all ${
                  plan.popular
                    ? 'bg-[#5C332D] hover:bg-[#4A2823] text-white shadow-md'
                    : 'bg-[#F5EBE1] hover:bg-[#EBDCCB] text-[#5C332D]'
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
