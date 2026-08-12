import Hero from '@/components/marketing/Hero';
import PricingCards from '@/components/marketing/PricingCards';
import Link from 'next/link';
import { Palette, Users, Grid, MessageSquare, ShieldCheck, Heart, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-16 bg-[#FAF6F0]">
      {/* Hero Section */}
      <Hero />

      {/* Feature Highlights Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-[#E8DEC8]">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase tracking-widest text-[#5C332D] font-bold">Everything You Need</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#3A1E1A]">Powerful Tools for Effortless Weddings</h2>
          <p className="text-[#755D58] text-sm max-w-xl mx-auto">
            Say goodbye to paper cards and lost RSVPs. PlanMyGuest provides end-to-end digital wedding planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-[#E8DEC8] bg-white">
            <div className="w-12 h-12 rounded-2xl bg-[#F5E6E3] text-[#5C332D] border border-[#D5A49B] flex items-center justify-center">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#3A1E1A]">Live Website Builder</h3>
            <p className="text-xs text-[#755D58] leading-relaxed">
              Choose from luxury Poruwa & Modern wedding themes. Customize colors, cover photos, auspicious times, and venue maps.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-[#E8DEC8] bg-white">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#3A1E1A]">Smart Guest & RSVP List</h3>
            <p className="text-xs text-[#755D58] leading-relaxed">
              Track attendance responses in real-time. Collect dietary preferences, plus-ones counts, and warm wishes.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-[#E8DEC8] bg-white">
            <div className="w-12 h-12 rounded-2xl bg-[#F5E6E3] text-[#5C332D] border border-[#D5A49B] flex items-center justify-center">
              <Grid className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#3A1E1A]">Drag & Drop Seating</h3>
            <p className="text-xs text-[#755D58] leading-relaxed">
              Visually arrange tables and seats. Guests can use the mobile "Find My Seat" tool at your wedding reception.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="glass-card p-6 rounded-3xl space-y-4 border border-[#E8DEC8] bg-white">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 border border-blue-300 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#3A1E1A]">WhatsApp Direct Invites</h3>
            <p className="text-xs text-[#755D58] leading-relaxed">
              Dispatch personalized WhatsApp wedding invitation messages and reminders to guests in one single click.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <PricingCards />

      {/* Testimonials */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-[#E8DEC8]">
        <div className="text-center space-y-3 mb-16">
          <span className="text-xs uppercase tracking-widest text-[#5C332D] font-bold">Love Stories</span>
          <h2 className="font-serif text-4xl font-bold text-[#3A1E1A]">Loved by Couples Across Sri Lanka</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              names: 'Kavinda & Thilini',
              location: 'Shangri-La, Colombo',
              quote: 'PlanMyGuest saved us weeks of manual follow-ups! Over 200 guests confirmed via WhatsApp within 48 hours.',
            },
            {
              names: 'Dr. Ruwan & Nimmi',
              location: 'Cinnamon Grand, Colombo',
              quote: 'The drag and drop seating chart visualizer was a game changer for our 300-guest reception banquet!',
            },
            {
              names: 'Pathum & Dinithi',
              location: 'Earl’s Regency, Kandy',
              quote: 'Our guests loved the mobile "Find My Seat" feature on the wedding day. Very elegant design!',
            },
          ].map((t, i) => (
            <div key={i} className="glass-card p-8 rounded-3xl border border-[#E8DEC8] bg-white space-y-4 shadow-sm">
              <div className="flex gap-1 text-[#B89324]">
                {'★'.repeat(5)}
              </div>
              <p className="text-[#3A1E1A] text-sm italic">"{t.quote}"</p>
              <div className="pt-4 border-t border-[#E8DEC8]">
                <p className="font-serif font-bold text-[#5C332D] text-base">{t.names}</p>
                <p className="text-xs text-[#8C746E]">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="bg-[#F5E6E3] border border-[#D5A49B] p-12 rounded-3xl text-center space-y-6 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Heart className="w-64 h-64 text-[#5C332D] fill-[#5C332D]" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#3A1E1A]">Ready to Build Your Digital Invitation?</h2>
          <p className="text-[#755D58] text-base max-w-xl mx-auto">
            Start creating your personalized wedding website today. No credit card required to start for free.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-[#5C332D] hover:bg-[#4A2823] text-white font-bold px-8 py-4 rounded-2xl text-base shadow-md hover:scale-105 transition-transform"
          >
            Create Free Invitation Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
