import './globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/lib/AuthContext';

export const metadata: Metadata = {
  title: 'Plan My Guest - Luxury Digital Wedding Invitations & Seating Planner (Sri Lanka)',
  description:
    'Create stunning digital wedding invitation websites, manage guest lists, track RSVPs, send WhatsApp invitations, and plan drag-and-drop seating charts in Sri Lanka.',
  keywords: ['wedding invitation Sri Lanka', 'digital wedding site', 'Plan My Guest', 'PayHere wedding', 'WhatsApp wedding RSVP'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Dancing+Script:wght@600;700&family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-100 antialiased selection:bg-gold-400 selection:text-slate-950">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
