import Link from 'next/link';
import { Heart, Send, ShieldCheck, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#FAF5EF] border-t border-[#E8DEC8] text-[#5C4A47] pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
        {/* Brand Info */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#5C332D] flex items-center justify-center text-white">
              <Heart className="w-5 h-5 fill-white" />
            </div>
            <span className="font-serif text-2xl font-bold text-[#3A1E1A]">
              PlanMyGuest<span className="text-[#8B483E]">.lk</span>
            </span>
          </div>
          <p className="text-sm text-[#755D58] leading-relaxed max-w-sm">
            Sri Lanka’s premier digital wedding invitation platform. Create stunning luxury wedding websites, manage guest lists, send WhatsApp invites, and plan seating charts seamlessly.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <span className="text-xs bg-white border border-[#E8DEC8] px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[#5C332D] font-medium shadow-sm">
              <CreditCard className="w-3.5 h-3.5 text-[#B89324]" /> Powered by PayHere (LKR)
            </span>
            <span className="text-xs bg-white border border-[#E8DEC8] px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-[#5C332D] font-medium shadow-sm">
              <Send className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp Cloud API
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold text-[#3A1E1A] mb-4 text-sm tracking-wider uppercase">Platform</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/features" className="hover:text-[#5C332D] transition-colors">
                Website Builder
              </Link>
            </li>
            <li>
              <Link href="/features" className="hover:text-[#5C332D] transition-colors">
                Guest List & RSVP
              </Link>
            </li>
            <li>
              <Link href="/features" className="hover:text-[#5C332D] transition-colors">
                Seating Chart Planner
              </Link>
            </li>
            <li>
              <Link href="/features" className="hover:text-[#5C332D] transition-colors">
                WhatsApp Invites
              </Link>
            </li>
            <li>
              <Link href="/templates" className="hover:text-[#5C332D] transition-colors">
                Invitation Gallery
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="font-semibold text-[#3A1E1A] mb-4 text-sm tracking-wider uppercase">Resources</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href="/blog" className="hover:text-[#5C332D] transition-colors">
                Sri Lankan Wedding Guides
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-[#5C332D] transition-colors">
                Pricing & Packages
              </Link>
            </li>
            <li>
              <Link href="/vishmi-sanjana" className="hover:text-[#5C332D] transition-colors">
                Live Sample Invitation
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-[#5C332D] transition-colors">
                Support & Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal & Security */}
        <div>
          <h4 className="font-semibold text-[#3A1E1A] mb-4 text-sm tracking-wider uppercase">Trust & Legal</h4>
          <ul className="space-y-2.5 text-sm">
            <li className="flex items-center gap-1.5 text-[#755D58]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> SSL Encrypted
            </li>
            <li>
              <Link href="#" className="hover:text-[#5C332D] transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#5C332D] transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="/admin" className="text-xs text-[#8C746E] hover:text-[#5C332D]">
                Admin Panel Access
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#E8DEC8] flex flex-col md:flex-row items-center justify-between text-xs text-[#8C746E] gap-4">
        <p>© 2026 PlanMyGuest.lk. Designed with ❤️ for Sri Lankan & Global Weddings.</p>
        <div className="flex gap-6">
          <Link href="/" className="hover:text-[#3A1E1A]">
            Colombo, Sri Lanka
          </Link>
          <Link href="/pricing" className="hover:text-[#3A1E1A]">
            PayHere Gateway Certified
          </Link>
        </div>
      </div>
    </footer>
  );
}
