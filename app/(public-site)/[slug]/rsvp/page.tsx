'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, User, ArrowRight, CheckCircle2, Heart, Sparkles, Utensils, Users } from 'lucide-react';

export default function PublicRSVPPage({ params }: { params: { slug: string } }) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [rsvpStatus, setRsvpStatus] = useState<'attending' | 'declined'>('attending');
  const [plusOnes, setPlusOnes] = useState(0);
  const [dietary, setDietary] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const coupleTitle = params.slug.includes('vishmi') ? 'Vishmi & Sanjana' : 'Sarah & James';

  const handleSearchInvitation = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setStep(2);
    }
  };

  const handleSubmitRSVP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          rsvpStatus,
          plusOnes,
          dietaryRestrictions: dietary,
          message,
        }),
      });
    } catch {
      // Fallback
    } finally {
      setLoading(false);
      setStep(3);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] text-[#353023] font-sans flex flex-col justify-between py-10 px-4 selection:bg-[#F7CAC9] selection:text-[#755353]">
      <div className="max-w-md w-full mx-auto space-y-8">
        {/* Top Header */}
        <div className="text-center">
          <Link href={`/${params.slug}`} className="inline-block">
            <h1 className="font-serif text-4xl font-bold text-[#785655] hover:opacity-90 transition-opacity">
              {coupleTitle}
            </h1>
          </Link>
        </div>

        {/* Step Progress Bar Header */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-[#827473]">Step {step} of 3</span>
            <span className="text-[#785655] font-bold">
              {step === 1 ? 'Find Your Invitation' : step === 2 ? 'RSVP Details' : 'Confirmation'}
            </span>
          </div>
          <div className="w-full bg-[#EBE2CE] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#785655] h-full rounded-full transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* STEP 1: Find Invitation */}
        {step === 1 && (
          <div className="bg-white rounded-3xl border border-[#EBE2CE] p-8 shadow-[0_10px_30px_-10px_rgba(247,202,201,0.3)] space-y-6 text-center animate-[fadeIn_0.3s_ease-out]">
            <div className="w-14 h-14 rounded-full bg-[#FAF6F0] text-[#785655] border border-[#EBE2CE] flex items-center justify-center mx-auto shadow-sm">
              <Search className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-bold text-[#353023]">Find Your Invitation</h2>
              <p className="text-xs text-[#504444] leading-relaxed">
                Please enter your exact name as it appears on your physical invitation envelope.
              </p>
            </div>

            <form onSubmit={handleSearchInvitation} className="space-y-4 text-left">
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-[#1F1B0F]">First & Last Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3.5 top-3.5 text-[#827473]" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#FFF8F0] border border-[#D4C3C2] rounded-xl pl-10 pr-4 py-3 text-xs text-[#1F1B0F] font-medium focus:outline-none focus:border-[#785655]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#785655] hover:bg-[#5E3F3E] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                Find Invitation <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Attendance & Details */}
        {step === 2 && (
          <div className="bg-white rounded-3xl border border-[#EBE2CE] p-8 shadow-[0_10px_30px_-10px_rgba(247,202,201,0.3)] space-y-6 animate-[fadeIn_0.3s_ease-out]">
            <div className="text-center space-y-1">
              <h2 className="font-serif text-3xl font-bold text-[#353023]">Welcome, {name}!</h2>
              <p className="text-xs text-[#504444]">Please confirm your attendance below</p>
            </div>

            <form onSubmit={handleSubmitRSVP} className="space-y-4 text-xs">
              {/* RSVP Status Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRsvpStatus('attending')}
                  className={`py-3.5 rounded-xl font-bold border transition-all ${
                    rsvpStatus === 'attending'
                      ? 'bg-[#785655] text-white border-[#785655] shadow-sm'
                      : 'bg-[#FFF8F0] text-[#504444] border-[#D4C3C2]'
                  }`}
                >
                  ✓ Joyfully Accepts
                </button>
                <button
                  type="button"
                  onClick={() => setRsvpStatus('declined')}
                  className={`py-3.5 rounded-xl font-bold border transition-all ${
                    rsvpStatus === 'declined'
                      ? 'bg-rose-700 text-white border-rose-700 shadow-sm'
                      : 'bg-[#FFF8F0] text-[#504444] border-[#D4C3C2]'
                  }`}
                >
                  ✕ Regretfully Declines
                </button>
              </div>

              {rsvpStatus === 'attending' && (
                <>
                  <div>
                    <label className="block text-[#1F1B0F] font-semibold mb-1">Bringing Plus-Ones?</label>
                    <select
                      value={plusOnes}
                      onChange={(e) => setPlusOnes(Number(e.target.value))}
                      className="w-full bg-[#FFF8F0] border border-[#D4C3C2] text-[#1F1B0F] rounded-xl px-4 py-3 focus:outline-none focus:border-[#785655]"
                    >
                      <option value={0}>Just me (0 Plus-ones)</option>
                      <option value={1}>+1 Guest</option>
                      <option value={2}>+2 Guests</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#1F1B0F] font-semibold mb-1">Dietary Restrictions</label>
                    <input
                      type="text"
                      placeholder="e.g. Vegetarian, Gluten-free, Allergies"
                      value={dietary}
                      onChange={(e) => setDietary(e.target.value)}
                      className="w-full bg-[#FFF8F0] border border-[#D4C3C2] text-[#1F1B0F] rounded-xl px-4 py-3 focus:outline-none focus:border-[#785655]"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-[#1F1B0F] font-semibold mb-1">Warm Wishes for the Couple</label>
                <textarea
                  rows={3}
                  placeholder="Leave a sweet note..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#FFF8F0] border border-[#D4C3C2] text-[#1F1B0F] rounded-xl p-3 focus:outline-none focus:border-[#785655] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-[#785655] hover:bg-[#5E3F3E] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
              >
                {loading ? 'Submitting...' : 'Submit RSVP Response'} <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* STEP 3: Confirmation */}
        {step === 3 && (
          <div className="bg-white rounded-3xl border border-[#EBE2CE] p-8 shadow-[0_10px_30px_-10px_rgba(247,202,201,0.3)] space-y-6 text-center animate-[fadeIn_0.3s_ease-out]">
            <CheckCircle2 className="w-16 h-16 text-emerald-700 mx-auto" />
            <div className="space-y-2">
              <h2 className="font-serif text-3xl font-bold text-[#353023]">RSVP Received!</h2>
              <p className="text-xs text-[#504444] leading-relaxed">
                Thank you, <span className="font-bold text-[#353023]">{name}</span>! Your response has been recorded.
              </p>
            </div>

            <div className="p-4 bg-[#F7EDD9] rounded-2xl text-xs text-[#785655] font-semibold border border-[#EBE2CE]">
              ✨ You can check your table seat assignment anytime using the seat lookup tool.
            </div>

            <Link
              href={`/${params.slug}`}
              className="inline-block w-full py-3.5 bg-[#785655] hover:bg-[#5E3F3E] text-white font-bold rounded-xl text-xs shadow-sm transition-colors"
            >
              Return to Invitation Site
            </Link>
          </div>
        )}

        {/* Footer Link */}
        <div className="text-center text-xs text-[#827473]">
          Need help?{' '}
          <Link href={`/${params.slug}`} className="text-[#785655] font-bold hover:underline">
            Contact the couple
          </Link>
        </div>
      </div>
    </div>
  );
}
