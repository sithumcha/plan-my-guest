'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Globe,
  Users,
  CalendarCheck,
  Armchair,
  Mail,
  Image as ImageIcon,
  Settings,
  HelpCircle,
  LogOut,
  CreditCard,
} from 'lucide-react';
import { useAuth } from '@/lib/AuthContext';

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Website', href: '/dashboard/website-builder', icon: Globe },
  { name: 'Guests', href: '/dashboard/guests', icon: Users },
  { name: 'RSVP', href: '/dashboard/rsvp', icon: CalendarCheck },
  { name: 'Seating', href: '/dashboard/seating', icon: Armchair },
  { name: 'Messages', href: '/dashboard/messages', icon: Mail },
  { name: 'Gallery', href: '/dashboard/gallery', icon: ImageIcon },
  { name: 'Billing', href: '/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar({
  coupleNames: defaultCoupleNames = 'Sarah & James',
  weddingDate: defaultWeddingDate = 'Oct 24, 2024',
}: {
  coupleNames?: string;
  weddingDate?: string;
  slug?: string;
}) {
  const pathname = usePathname();
  const { user, wedding, logout } = useAuth();

  // Compute dynamic couple names
  const activeCoupleNames = wedding?.groomName && wedding?.brideName
    ? `${wedding.groomName} & ${wedding.brideName}`
    : user?.name || defaultCoupleNames;

  // Format wedding date
  const activeWeddingDate = wedding?.weddingDate
    ? new Date(wedding.weddingDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : defaultWeddingDate;

  // Get initials from active couple names or user name
  const initials = activeCoupleNames.includes('&')
    ? activeCoupleNames
        .split('&')
        .map((n) => n.trim().charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2)
    : activeCoupleNames
        .split(' ')
        .map((n) => n.charAt(0))
        .join('')
        .toUpperCase()
        .substring(0, 2);

  return (
    <aside className="w-[240px] bg-[#FAF3E8] border-r border-[#E8DEC8] flex flex-col h-screen sticky top-0 z-40 p-4 gap-2 font-sans">
      {/* Header with Elegant Initials Badge */}
      <div className="flex items-center gap-3 mb-6 p-1">
        <div className="w-12 h-12 rounded-full bg-[#F5E6E3] border border-[#D5A49B] text-[#785655] font-serif font-bold text-base flex items-center justify-center shadow-sm flex-shrink-0">
          {initials || 'SJ'}
        </div>
        <div className="overflow-hidden">
          <h2 className="font-serif font-bold text-lg text-[#5C332D] leading-tight truncate" title={activeCoupleNames}>
            {activeCoupleNames}
          </h2>
          <p className="text-xs text-[#755D58] font-medium">{activeWeddingDate}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col gap-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#F5E6E3] text-[#5C332D] font-bold shadow-sm translate-x-1'
                  : 'text-[#755D58] hover:text-[#3A1E1A] hover:bg-[#FAF6F0]'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#5C332D]' : 'text-[#8C746E]'}`} />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer Links */}
      <div className="mt-auto pt-3 border-t border-[#E8DEC8] flex flex-col gap-1">
        <Link
          href="/contact"
          className="flex items-center gap-3 px-3.5 py-2 text-xs text-[#755D58] hover:text-[#3A1E1A] hover:bg-[#FAF6F0] rounded-xl font-medium transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-[#8C746E]" />
          <span>Help</span>
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3.5 py-2 text-xs text-[#755D58] hover:text-[#5C332D] hover:bg-rose-50 rounded-xl font-medium transition-colors"
        >
          <LogOut className="w-4 h-4 text-[#8C746E]" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
