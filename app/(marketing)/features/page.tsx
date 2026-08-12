import Link from 'next/link';
import { Palette, Users, Grid, MessageSquare, Check, Sparkles, ArrowRight } from 'lucide-react';

export default function FeaturesPage() {
  return (
    <div className="py-16 px-6 max-w-7xl mx-auto space-y-20">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-gold-400 font-semibold">Features Suite</span>
        <h1 className="font-serif text-5xl font-bold text-white">Everything You Need for Perfect Wedding Planning</h1>
        <p className="text-slate-300 text-base">
          From modern website builder themes to Sri Lankan PayHere payment processing and WhatsApp invite dispatching.
        </p>
      </div>

      <div className="space-y-16">
        {/* Feature 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center glass-panel p-8 md:p-12 rounded-3xl border border-slate-800">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-400/20 text-gold-400 flex items-center justify-center">
              <Palette className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-white">Luxury Website Builder</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Design a gorgeous digital invitation website tailored with your custom colors, Poruwa time details, countdown timer, venue map, and bank details for gift registry.
            </p>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gold-400" /> Royal, Modern, Classic & Boho themes
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gold-400" /> Auspicious time Poruwa schedule
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-gold-400" /> Custom wedding slug (e.g. plansite.lk/kasun-dilhani)
              </li>
            </ul>
          </div>
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300">
            <div className="text-gold-400 font-bold mb-2">// Website Builder Preview</div>
            <p className="text-slate-400">Groom: Kasun Perera</p>
            <p className="text-slate-400">Bride: Dilhani Silva</p>
            <p className="text-slate-400">Venue: Shangri-La Hotel Ballroom</p>
            <p className="text-emerald-400 mt-2">Status: Published Live ✓</p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center glass-panel p-8 md:p-12 rounded-3xl border border-slate-800">
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 order-2 md:order-1">
            <div className="text-emerald-400 font-bold mb-2">// WhatsApp Invite Dispatcher</div>
            <p className="text-slate-300">Recipient: +94 77 123 4567 (Nimal)</p>
            <p className="text-slate-400">Message: "You are cordially invited to Kasun & Dilhani's wedding..."</p>
            <p className="text-emerald-400 mt-2">Delivery Status: Sent ✓</p>
          </div>
          <div className="space-y-4 order-1 md:order-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-white">WhatsApp & SMS Invites</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Send instant WhatsApp invitation links to your entire guest list. Avoid postal delays and track when guests view and confirm their RSVP.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
